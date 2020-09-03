<template scoped>
  <b-tab :title="$t('titles.assets')">
    <b-container class="mt-3">
        <b-row>
            <b-col lg="3">
                <b-card :title="$t('filter.title')">
                    <b-card-text>
                        <b-form-group :label="$t('filter.name')">
                            <b-form-input v-model="filter.name"></b-form-input>
                        </b-form-group>
                        <div class="w-100 text-right">
                            <b-button variant="danger" v-on:click="resetFilter" class="mr-2">{{$t('filter.reset')}}</b-button>
                            <b-button variant="secondary" v-on:click="refreshTable">{{$t('filter.action')}}</b-button>
                        </div>
                    </b-card-text>
                </b-card>
                <b-card :title="$t('add')" class="mt-3" v-if="hasWritePermission">
                    <b-card-text>
                        <b-form-group :label="$t('table.name')">
                            <b-form-input v-model="asset.name"></b-form-input>
                        </b-form-group>
                        <b-form-group :label="$t('table.value')">
                            <b-form-input type="number" v-model.number="asset.value"></b-form-input>
                        </b-form-group>
                        <b-form-group :label="$t('table.comment')">
                            <b-form-textarea v-model="asset.comments"></b-form-textarea>
                        </b-form-group>
                        <div class="w-100 text-right">
                            <b-button variant="secondary" v-on:click="addAsset()">{{$t('filter.action')}}</b-button>
                        </div>
                    </b-card-text>
                </b-card>
            </b-col>
            <b-col lg="9">
                <b-table striped hover sticky-header="100%" :items="getData" :fields="fields" ref="assets-table" class="clickable" @row-clicked="rowClicked">
                    <template v-slot:cell(value)="row">
                    {{row.item.value ? '€' + row.item.value.toFixed(2) : undefined}}
                    </template>

                    <template v-slot:head(name)>{{$t('table.name')}}</template>
                    <template v-slot:head(value)>{{$t('table.value')}}</template>
                    <template v-slot:head(comments)>{{$t('table.comment')}}</template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>

    <b-modal
        :title="$t('edit')"
        :visible.sync="dialogVisible"
        hide-header-close>
            <b-form>
                <b-form-group :label="$t('table.name')">
                    <b-form-input v-model="assetToEdit.name"></b-form-input>
                </b-form-group>
                <b-form-group :label="$t('table.value')">
                    <b-form-input type="number" v-model.number="assetToEdit.value"></b-form-input>
                </b-form-group>
                <b-form-group :label="$t('table.comment')">
                    <b-form-textarea v-model="assetToEdit.comments"></b-form-textarea>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer>
            <div class="w-100 text-right">
                <b-button variant="danger" @click="deleteItem" class="mr-2">{{$t('filter.delete')}}</b-button>
                <b-button variant="dark" @click="dialogVisible = false" class="mr-2">{{$t('filter.cancel')}}</b-button>
                <b-button variant="secondary" @click="submitDialog">{{$t('filter.action')}}</b-button>
            </div>
            </template>
        </b-modal>
  </b-tab>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AccountancyService } from '../../../openapi/api/accountancy.service';
import openApiContainer from '@/openapi.container';
import HttpResponse from '../../../openapi/HttpResponse';
import moment from 'moment';
import { Assets } from '@/openapi/model/assets';
import { AssetsDTO } from '@/openapi/model/assetsDTO';

@Component({ })
export default class AssetsAccountancy extends Vue {
    private accountancyService: AccountancyService = openApiContainer.get<AccountancyService>('AccountancyService');
    private hasWritePermission = false;

    // filter
    private filter = { name: '' };

    // Add asset
    private asset: AssetsDTO = {
        name: '',
        value: 0,
        comments: '',
    };

    // Edit asset
    private dialogVisible = false;
    private assetToEdit: AssetsDTO = {
        name: '',
        value: 0,
        comments: '',
    };
    private assetsId: number = 0;

    // Table
    private items: Assets[] = [];
    private fields = [
        { key: 'name', sortable: true },
        { key: 'value', sortable: true },
        { key: 'comments', sortable: false },
    ];
    private needData = true;

    public async mounted() {
        this.hasWritePermission = this.$store.getters.hasPermission('Accountancy:Write');
    }

    private getData(ctx: any, callback: any) {
        if (this.items.length === 0 || this.needData) {
            this.accountancyService.getAssets(this.filter.name, 'response').subscribe((res: HttpResponse<Assets[]>) => {
                this.items = res.response;
                this.needData = false;
                callback(res.response);

            }, this.handleError);
        } else {
            this.items.sort((a: any, b: any) => {
                let reverse = 1;
                if (ctx.sortDesc) {
                    reverse = -1;
                }

                if (typeof a[ctx.sortBy] === 'number') {
                    return (a[ctx.sortBy] - b[ctx.sortBy]) * reverse;
                }

                return String(a[ctx.sortBy]).localeCompare(String(b[ctx.sortBy])) * reverse;
            });

            callback(this.items);
        }
    }

    private rowClicked(record: Assets, index: number) {
        if (this.hasWritePermission) {
            this.assetToEdit = JSON.parse(JSON.stringify(record));
            this.assetsId = record.id!;
            this.dialogVisible = true;

        } else {
            this.$notify({group: 'foo', text: this.$t('error.permission').toString(), type: 'error'});
        }
    }

    private refreshTable() {
        this.needData = true;
        (this.$refs['assets-table'] as any).refresh();
    }

    private resetFilter() {
        this.filter.name = '';
        this.refreshTable();
    }

    private addAsset() {
        this.accountancyService.addAssets(this.asset, 'response').subscribe(() => {
            this.refreshTable();
            this.asset = {
                name: '',
                value: 0,
                comments: '',
            };

            this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});

        }, this.handleError);
    }

    private submitDialog() {
        this.accountancyService.updateAssets(this.assetsId, this.assetToEdit, 'response').subscribe(() => {
            this.refreshTable();
            this.assetToEdit = {
                name: '',
                value: 0,
                comments: '',
            };
            this.assetsId = 0;

            this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
            this.dialogVisible = false;

        }, this.handleError);
    }

    private deleteItem() {
        this.accountancyService.deleteAssets(this.assetsId, 'response').subscribe(() => {
            this.refreshTable();
            this.assetToEdit = {
                name: '',
                value: 0,
                comments: '',
            };
            this.assetsId = 0;

            this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
            this.dialogVisible = false;

        }, this.handleError);
    }

    private handleError(err: HttpResponse) {
        if (err.status === 418) {
            this.$notify({group: 'foo', text: this.$t('error.api_not_activated').toString() + ' <a href="/admin/accountancy/activate">' + this.$t('error.api_not_activated_link_text').toString() + '</a>', type: 'error', duration: 60000});
        } else {
            this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
        }
    }
}
</script>
<style lang="scss">
</style>

<i18n src="@/lang/views/admin/accountancyAdmin.json"></i18n>