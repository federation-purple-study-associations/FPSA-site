<template scoped>
  <b-tab :title="$t('titles.add_mutation')">
    <b-container class="mt-3">
        <b-row align-h="center">
            <b-col md="6" class="add-mutation-form">
              <b-form-group :label="$t('form.date')">
                <b-form-datepicker v-model="dto.date"></b-form-datepicker>
              </b-form-group>
              <b-form-group :label="$t('form.description')">
                <b-form-input v-model="dto.description"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('form.iban')">
                <b-form-input v-model="dto.debtorIban"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('form.entry')">
                <b-form-input v-model="dto.entryReference"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('form.amount')">
                <b-form-input v-model.number="dto.amount"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('form.payment_method')">
                <b-form-select v-model="dto.paymentMethodId" :options="paymentMethodOptions"></b-form-select>
              </b-form-group>
              <b-form-group :label="$t('form.income_statement')">
                <b-form-select v-model="dto.incomeStatementId" :options="incomeStatementOptions"></b-form-select>
              </b-form-group>
              <div class="w-100 text-right">
                <b-button variant="primary" v-on:click="addMutation">{{$t('form.action')}}</b-button>
              </div>
            </b-col>
        </b-row>
    </b-container>
  </b-tab>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { IncomeStatementDTO } from '../../../openapi/model/incomeStatementDTO';
import { BalanceDTO } from '../../../openapi/model/balanceDTO';
import { AddMutationDTO } from '../../../openapi/model/addMutationDTO';
import { Mutation } from '../../../openapi/model/mutation';
import { AccountancyService } from '../../../openapi/api/accountancy.service';
import openApiContainer from '@/openapi.container';
import HttpResponse from '../../../openapi/HttpResponse';
import moment from 'moment';

@Component({ })
export default class MutationAccountancy extends Vue {
    private accountancyService: AccountancyService = openApiContainer.get<AccountancyService>('AccountancyService');

    private paymentMethodOptions: Array<{value: number, text: string}> = [];
    private incomeStatementOptions: Array<{value: number, text: string}> = [];
    private dto: AddMutationDTO = {
      date: moment().format('YYYY-MM-DD'),
      description: '',
      entryReference: undefined,
      amount: 0,
      debtorIban: '',
      paymentMethodId: 0,
      incomeStatementId: 0,
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

    private addMutation() {
      this.accountancyService.addMutation(this.dto, 'response').subscribe((res: HttpResponse<Mutation>) => {
        this.dto = {
          date: moment().format('YYYY-MM-DD'),
          description: '',
          entryReference: undefined,
          amount: 0,
          debtorIban: '',
          paymentMethodId: 0,
          incomeStatementId: 0,
        };

        this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
      }, this.handleError);
    }

    private handleError(err: HttpResponse) {
      if (err.status === 400) {
        this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});

      } else if (err.status === 409) {
        this.$notify({group: 'foo', text: this.$t('error.code_already_exists').toString(), type: 'error'});

      } else {
        this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
      }
    }

    private handleGetError(err: HttpResponse) {
      if (err.status === 418) {
        this.$notify({group: 'foo', text: this.$t('error.api_not_activated').toString() + ' <a href="/dashboard/accountancy/activate">' + this.$t('error.api_not_activated_link_text').toString() + '</a>', type: 'error'});
      } else {
        this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
      }
    }
}
</script>
<style lang="scss">
</style>

<i18n src="@/lang/views/admin/accountancyAdmin.json"></i18n>