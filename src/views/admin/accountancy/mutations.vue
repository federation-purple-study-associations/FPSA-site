<template scoped>
  <b-tab :title="$t('titles.mutation')">
    <b-container class="mt-3">
        <b-row>
            <b-col lg="3">
                <b-card :title="$t('filter.title')">
                    <b-card-text>
                        <b-form-group :label="$t('filter.date_from')">
                            <b-form-datepicker v-model="dateFromFilter"></b-form-datepicker>
                        </b-form-group>
                        <b-form-group :label="$t('filter.date_till')">
                            <b-form-datepicker v-model="dateTillFilter"></b-form-datepicker>
                        </b-form-group>
                        <b-form-group :label="$t('filter.payment_method')">
                            <b-form-select v-model="paymentMethod" :options="paymentMethodOptions"></b-form-select>
                        </b-form-group>
                        <b-form-group :label="$t('filter.income_statement')">
                            <b-form-select v-model="incomeStatement" :options="incomeStatementOptions"></b-form-select>
                        </b-form-group>
                        <div class="w-100 text-right">
                            <b-button variant="danger" v-on:click="resetFilter" class="mr-2">{{$t('filter.reset')}}</b-button>
                            <b-button variant="secondary" v-on:click="refreshTable">{{$t('filter.action')}}</b-button>
                        </div>
                    </b-card-text>
                </b-card>
            </b-col>
            <b-col lg="9">
                <b-table sticky-header="100%" striped hover :items="getData" :fields="fields" ref="mutation-table" @row-clicked="showEditModal" class="clickable">
                    <template v-slot:cell(date)="row">
                        {{moment(row.item.date).format('DD-MM-YYYY')}}
                    </template>
                    <template v-slot:cell(description)="row">
                        <p class="wrapped-text">{{row.item.description}}</p>
                    </template>
                    <template v-slot:cell(amount)="row">
                        {{'€' + row.item.amount.toFixed(2)}}
                    </template>

                    <template v-slot:head(entryReference)>{{$t('table.entry_reference')}}</template>
                    <template v-slot:head(debtorIban)>{{$t('table.debtorIban')}}</template>
                    <template v-slot:head(description)>{{$t('table.description')}}</template>
                    <template v-slot:head(amount)>{{$t('table.amount')}}</template>
                    <template v-slot:head(date)>{{$t('table.date')}}</template>
                </b-table>

                <b-pagination align="center" :total-rows="count" :per-page="pageSize" v-model="page" @input="changePage"></b-pagination>
            </b-col>
        </b-row>
    </b-container>

    <b-modal ref="edit-mutation-modal" centered :title="$t('mutation.edit_modal_title')" hide-header-close @ok="editMutationRow()">
        <template v-slot:default="{ }">
          <b-form-group :label="$t('mutation.iban')">
            <b-form-input v-model="editMutation.debtorIban"/>
          </b-form-group>
          <b-form-group :label="$t('mutation.amount')">
            <b-form-input v-model="editMutation.amount"/>
          </b-form-group>
          <b-form-group :label="$t('mutation.description')">
            <b-form-input v-model="editMutation.description"/>
          </b-form-group>
          <b-form-group :label="$t('mutation.payment_method')" label-for="input-paymentMethod">
            <b-form-select v-model="editMutation.paymentMethodId" :options="paymentMethodOptions" id="input-paymentMethod"></b-form-select>
          </b-form-group>
          <b-form-group :label="$t('mutation.income_statement')" label-for="input-incomeStatement">
            <b-form-select v-model="editMutation.incomeStatementId" :options="incomeStatementOptions" id="input-incomeStatement"></b-form-select>
          </b-form-group>
        </template>

        <template v-slot:modal-footer="{ cancel, ok }">
            <b-button size="sm" variant="danger" @click="deleteMutationRow()">Delete</b-button>
            <b-button size="sm" variant="dark" @click="cancel()">Cancel</b-button>
            <b-button size="sm" variant="secondary" @click="ok()">OK</b-button>
        </template>
    </b-modal>
  </b-tab>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { IncomeStatementDTO } from '../../../openapi/model/incomeStatementDTO';
import { AccountancyService } from '../../../openapi/api/accountancy.service';
import openApiContainer from '@/openapi.container';
import HttpResponse from '../../../openapi/HttpResponse';
import moment from 'moment';
import { MutationDTO } from '@/openapi/model/mutationDTO';
import { MutationResponseDTO } from '@/openapi/model/mutationResponseDTO';
import { BalanceDTO } from '@/openapi/model/balanceDTO';
import { AddMutationDTO } from '@/openapi/model/addMutationDTO';
import { Mutation } from '@/openapi/model/mutation';

@Component({})
export default class MutationAccountancy extends Vue {
    private accountancyService: AccountancyService = openApiContainer.get<AccountancyService>('AccountancyService');
    private moment = moment;

    private dateFromFilter = moment().add(-1, 'week').format('YYYY-MM-DD');
    private dateTillFilter = moment().format('YYYY-MM-DD');
    private incomeStatement = 0;
    private paymentMethod = 0;
    private needData = true;

    private page: number = 1;
    private pageSize: number = 25;
    private count: number = 0;

    private items: MutationDTO[] = [];
    private fields = [
        { key: 'entryReference', sortable: true },
        { key: 'debtorIban', sortable: true },
        { key: 'description', sortable: true },
        { key: 'amount', sortable: true },
        { key: 'date', sortable: true },
    ];

    private paymentMethodOptions: Array<{value: number, text: string}> = [];
    private incomeStatementOptions: Array<{value: number, text: string}> = [];

    private editMutationId: number = 0;
    private editMutation: AddMutationDTO = {
        entryReference: 0,
        description: '',
        date: '',
        amount: 0,
        debtorIban: '',
        incomeStatementId: 0,
        paymentMethodId: 0,
    };

    constructor() {
        super();

        this.accountancyService.getBalance(moment().format('YYYY-MM-DD'), '', 'response').subscribe((res: HttpResponse<BalanceDTO[]>) => {
            for (const balance of res.response) {
                this.paymentMethodOptions.push({ value: balance.id, text: balance.name + ' - ' + balance.code });
            }
        }, this.handleGetError);

        this.accountancyService.getIncomeStatements(moment().format('YYYY-MM-DD'), '', 'response').subscribe((res: HttpResponse<IncomeStatementDTO[]>) => {
            for (const incomeStatement of res.response) {
                this.incomeStatementOptions.push({ value: incomeStatement.id, text: incomeStatement.name + ' - ' + incomeStatement.code });
            }
        }, this.handleGetError);
    }

    private getData(ctx: any, callback: any) {
        if (this.items.length === 0 || this.needData) {
            this.accountancyService.getMutations((this.page  - 1) * this.pageSize, this.pageSize, this.dateFromFilter, this.dateTillFilter, (this.paymentMethod === 0 ? undefined : this.paymentMethod), (this.incomeStatement === 0 ? undefined : this.incomeStatement), 'response').subscribe((res: HttpResponse<MutationResponseDTO>) => {
                this.items = res.response.mutations;
                this.count = res.response.total;
                this.needData = false;
                callback(res.response.mutations);

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

    private showEditModal(record: MutationDTO, index: number) {
      this.editMutationId = record.id;
      this.editMutation = {
        description: record.description,
        date: record.date,
        amount: record.amount,
        debtorIban: record.debtorIban,
        entryReference: record.entryReference,
        paymentMethodId: record.balanceId,
        incomeStatementId: record.incomeStatementId,
      };
      (this.$refs['edit-mutation-modal'] as any).show();
    }

    private editMutationRow() {
      this.needData = true;

      this.accountancyService.updateMutation(this.editMutationId, this.editMutation, 'response').subscribe((res: HttpResponse<Mutation>) => {
            this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
            (this.$refs['mutation-table'] as any).refresh();

        }, () => {
            this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
        });
    }

    private deleteMutationRow() {
      this.needData = true;

      this.accountancyService.deleteMutation(this.editMutationId, 'response').subscribe((res: HttpResponse) => {
            this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
            (this.$refs['mutation-table'] as any).refresh();
            (this.$refs['edit-mutation-modal'] as any).hide();

        }, () => {
            this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
        });
    }

    private changePage(index: number | null) {
        if (index) {
            this.refreshTable();
        }
    }

    private refreshTable() {
        this.needData = true;
        (this.$refs['mutation-table'] as any).refresh();
    }

    private resetFilter() {
        this.dateFromFilter = moment().add(-1, 'week').format('YYYY-MM-DD');
        this.dateTillFilter = moment().format('YYYY-MM-DD');
        this.incomeStatement = 0;
        this.paymentMethod = 0;

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
.wrapped-text {
    white-space: pre-line;
}
</style>

<i18n src="@/lang/views/admin/accountancyAdmin.json"></i18n>