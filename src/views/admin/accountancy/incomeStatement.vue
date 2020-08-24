<template scoped>
  <b-tab :title="$t('titles.income_statement')">
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
                <b-table sticky-header="100%" striped :items="getData" :fields="fields" ref="income-statement-table">
                    <template v-slot:cell(profit)="row">
                    {{row.item.profit ? '€' + row.item.profit.toFixed(2) : undefined}}
                    </template>
                    <template v-slot:cell(lost)="row">
                    {{row.item.lost ? '€' + row.item.lost.toFixed(2) : undefined}}
                    </template>

                    <template v-slot:head(code)>{{$t('table.code')}}</template>
                    <template v-slot:head(name)>{{$t('table.name')}}</template>
                    <template v-slot:head(profit)>{{$t('table.profit')}}</template>
                    <template v-slot:head(lost)>{{$t('table.lost')}}</template>
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
import moment from 'moment';

@Component({ })
export default class IncomeStatement extends Vue {
    private accountancyService: AccountancyService = openApiContainer.get<AccountancyService>('AccountancyService');

    private dateFilter = moment().format('YYYY-MM-DD');
    private nameFilter = '';
    private needData = true;

    private items: IncomeStatementDTO[] = [];
    private fields = [
        { key: 'code', sortable: true },
        { key: 'name', sortable: true },
        { key: 'profit', sortable: true },
        { key: 'lost', sortable: true },
    ];

    private getData(ctx: any, callback: any) {
        if (this.items.length === 0 || this.needData) {
            this.accountancyService.getIncomeStatements(this.dateFilter, this.nameFilter, 'response').subscribe((res: HttpResponse<IncomeStatementDTO[]>) => {
                const totalProfit = res.response.reduce((a, b) => a + (b.profit || 0), 0);
                const totalLost = res.response.reduce((a, b) => a + (b.lost || 0), 0);
                const text = (totalProfit - totalLost) >= 0 ? 'table.profit_text' : 'table.lost_text';

                const totalProfitOrLost: IncomeStatementDTO = {
                    id: 0,
                    name: this.$t(text).toString(),
                    profit: (totalProfit - totalLost) < 0 ? (totalProfit - totalLost) * -1 : undefined,
                    lost: (totalProfit - totalLost) >= 0 ? (totalProfit - totalLost) : undefined,
                };
                const total: IncomeStatementDTO = {
                    id: 0,
                    name: '',
                    profit: Math.max(totalProfit, totalLost),
                    lost: Math.max(totalProfit, totalLost),
                };

                res.response.push(totalProfitOrLost);
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
        (this.$refs['income-statement-table'] as any).refresh();
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