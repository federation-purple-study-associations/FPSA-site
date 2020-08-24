<template scoped>
  <b-tab :title="$t('titles.balance')">
    <b-container class="mt-3">
        <b-row>
            <b-col lg="3">
                <b-card :title="$t('filter.title')">
                    <b-card-text>
                        <b-form-group :label="$t('filter.name')">
                            <b-form-input v-model="nameFilter"></b-form-input>
                        </b-form-group>
                        <b-form-group :label="$t('filter.date')">
                            <b-form-datepicker v-model="dateFilter"></b-form-datepicker>
                        </b-form-group>
                        <div class="w-100 text-right">
                            <b-button variant="danger" v-on:click="resetFilter" class="mr-2">{{$t('filter.reset')}}</b-button>
                            <b-button variant="secondary" v-on:click="refreshTable">{{$t('filter.action')}}</b-button>
                        </div>
                    </b-card-text>
                </b-card>
            </b-col>
            <b-col lg="9">
                <b-table sticky-header="100%" striped :items="getData" :fields="fields" ref="balance-table">
                    <template v-slot:cell(assets)="row">
                    {{row.item.assets ? '€' + row.item.assets.toFixed(2) : undefined}}
                    </template>
                    <template v-slot:cell(liabilities)="row">
                    {{row.item.liabilities ? '€' + row.item.liabilities.toFixed(2) : undefined}}
                    </template>

                    <template v-slot:head(name)>{{$t('table.name')}}</template>
                    <template v-slot:head(assets)>{{$t('table.assets')}}</template>
                    <template v-slot:head(liabilities)>{{$t('table.liabilities')}}</template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
  </b-tab>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { IncomeStatementDTO } from '../../../openapi/model/incomeStatementDTO';
import { AccountancyService } from '../../../openapi/api/accountancy.service';
import openApiContainer from '@/openapi.container';
import HttpResponse from '../../../openapi/HttpResponse';
import { BalanceDTO } from '../../../openapi/model/balanceDTO';
import moment from 'moment';

@Component({ })
export default class AccountancyBalance extends Vue {
    private accountancyService: AccountancyService = openApiContainer.get<AccountancyService>('AccountancyService');

    private dateFilter = moment().format('YYYY-MM-DD');
    private nameFilter = '';
    private needData = true;

    private items: BalanceDTO[] = [];
    private fields = [
        { key: 'code', sortable: true },
        { key: 'name', sortable: true },
        { key: 'assets', sortable: true },
        { key: 'liabilities', sortable: true },
    ];

    private getData(ctx: any, callback: any) {
        if (this.items.length === 0 || this.needData) {
            this.accountancyService.getBalance(this.dateFilter, this.nameFilter, 'response').subscribe((res: HttpResponse<BalanceDTO[]>) => {
                const totalAssets = res.response.reduce((a, b) => a + (b.assets || 0), 0);
                const totalLiabilities = res.response.reduce((a, b) => a + (b.liabilities || 0), 0);

                const totalAssetsOrLiabilities: BalanceDTO = {
                    id: 0,
                    code: undefined,
                    name: this.$t('table.balance').toString(),
                    assets: (totalAssets - totalLiabilities) < 0 ? (totalAssets - totalLiabilities) : undefined,
                    liabilities: (totalAssets - totalLiabilities) >= 0 ? (totalAssets - totalLiabilities) : undefined,
                    startAssets: 0,
                    startLiabilities: 0,
                };
                const total: BalanceDTO = {
                    id: 0,
                    code: undefined,
                    name: '',
                    assets: Math.max(totalAssets, totalLiabilities),
                    liabilities: Math.max(totalAssets, totalLiabilities),
                    startAssets: 0,
                    startLiabilities: 0,
                };

                res.response.push(totalAssetsOrLiabilities);
                res.response.push(total);

                this.items = res.response;
                this.needData = false;
                callback(res.response);
            }, this.handleGetError);
        } else {
            this.items.sort((a: any, b: any) => {
                // Need to skip last two of the table. Those two have id: 0
                if (a.id === 0) {
                    return 100;
                }

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

    private refreshTable() {
        this.needData = true;
        (this.$refs['balance-table'] as any).refresh();
    }

    private resetFilter() {
        this.dateFilter = moment().format('YYYY-MM-DD');
        this.nameFilter = '';

        this.refreshTable();
    }

    private handleGetError(err: HttpResponse) {
        if (err.status === 418) {
        this.$notify({group: 'foo', text: this.$t('error.api_not_activated').toString() + ' <a href="/dashboard/accountancy/activate">' + this.$t('error.api_not_activated_link_text').toString() + '</a>', type: 'error', duration: 60000});
        } else {
        this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
        }
    }
}
</script>
<style lang="scss">

</style>

<i18n src="@/lang/views/admin/accountancyAdmin.json"></i18n>