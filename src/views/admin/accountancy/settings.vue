<template scoped>
  <b-tab :title="$t('titles.settings')">
    <b-container class="mt-3">
        <b-row>
            <b-col md="12">
              <h2 class="title--purple">{{$t('payment_method.title')}}</h2>
              <b-table sticky-header="100%" :items="getBalanceData" :fields="balanceFields" ref="balance-table" @row-clicked="showEditBalanceRowModal" class="clickable">
                <template v-slot:head(code)>{{$t('payment_method.code')}}</template>
                <template v-slot:head(name)>{{$t('payment_method.name')}}</template>
                <template v-slot:head(startAssets)>{{$t('payment_method.start_assets')}}</template>
                <template v-slot:head(startLiabilities)>{{$t('payment_method.start_liabilities')}}</template>
              </b-table>
              <div class="w-100 text-right">
                <b-button variant="secondary" v-on:click="showAddBalanceRowModal">{{$t('payment_method.add_action')}}</b-button>
              </div>
            </b-col>

            <b-col md="12">
              <h2 class="title--purple">{{$t('income_statement.title')}}</h2>
              <b-table sticky-header="100%" :items="getIncomeStatementData" :fields="incomeStatementFields" ref="income-statement-table" @row-clicked="openEditIncomeStatementRowModal" class="clickable">
                <template v-slot:head(code)>{{$t('income_statement.code')}}</template>
                <template v-slot:head(name)>{{$t('income_statement.name')}}</template>
              </b-table>
              <div class="w-100 text-right">
                <b-button variant="secondary" v-on:click="showAddIncomeStatementModal">{{$t('income_statement.add_action')}}</b-button>
              </div>
            </b-col>
        </b-row>
    </b-container>

    <b-modal ref="add-balance-modal" centered @ok="addBalanceRow" :title="$t('payment_method.add_modal_title')" hide-header-close>
        <template v-slot:default="{ }">
          <b-form-group :label="$t('payment_method.code')">
            <b-form-input v-model.number="addBalance.code"/>
          </b-form-group>
          <b-form-group :label="$t('payment_method.name')">
            <b-form-input v-model="addBalance.name"/>
          </b-form-group>
          <b-form-group :label="$t('payment_method.start_assets')">
            <b-form-input v-model.number="addBalance.startAssets"/>
          </b-form-group>
          <b-form-group :label="$t('payment_method.start_liabilities')">
            <b-form-input v-model.number="addBalance.startLiabilities"/>
          </b-form-group>
        </template>

        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="dark" @click="cancel()">Cancel</b-button>
            <b-button size="sm" variant="secondary" @click="ok()">OK</b-button>
        </template>
    </b-modal>

    <b-modal ref="add-income-statement-modal" centered @ok="addIncomeStatementRow" :title="$t('income_statement.add_modal_title')" hide-header-close>
        <template v-slot:default="{ }">
          <b-form-group :label="$t('income_statement.code')">
            <b-form-input v-model.number="addIncomeStatement.code"/>
          </b-form-group>
          <b-form-group :label="$t('income_statement.name')">
            <b-form-input v-model="addIncomeStatement.name"/>
          </b-form-group>
        </template>

        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="dark" @click="cancel()">Cancel</b-button>
            <b-button size="sm" variant="secondary" @click="ok()">OK</b-button>
        </template>
    </b-modal>

    <b-modal ref="edit-balance-modal" centered :title="$t('payment_method.edit_modal_title')" hide-header-close>
        <template v-slot:default="{ }">
          <b-form-group :label="$t('payment_method.code')">
            <b-form-input v-model.number="editBalance.code"/>
          </b-form-group>
          <b-form-group :label="$t('payment_method.name')">
            <b-form-input v-model="editBalance.name"/>
          </b-form-group>
          <b-form-group :label="$t('payment_method.start_assets')">
            <b-form-input v-model.number="editBalance.startAssets"/>
          </b-form-group>
          <b-form-group :label="$t('payment_method.start_liabilities')">
            <b-form-input v-model.number="editBalance.startLiabilities"/>
          </b-form-group>
        </template>

        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="danger" @click="deleteBalanceRow()">Delete</b-button>
          <b-button size="sm" variant="dark" @click="cancel()">Cancel</b-button>
          <b-button size="sm" variant="secondary" @click="editBalanceRow()">OK</b-button>
        </template>
    </b-modal>

    <b-modal ref="edit-income-statement-modal" centered :title="$t('income_statement.edit_modal_title')" hide-header-close>
        <template v-slot:default="{ }">
          <b-form-group :label="$t('income_statement.code')">
            <b-form-input v-model.number="editIncomeStatement.code"/>
          </b-form-group>
          <b-form-group :label="$t('income_statement.name')">
            <b-form-input v-model="editIncomeStatement.name"/>
          </b-form-group>
        </template>

        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="danger" @click="deleteIncomeStatementRow()">Delete</b-button>
            <b-button size="sm" variant="dark" @click="cancel()">Cancel</b-button>
            <b-button size="sm" variant="secondary" @click="editIncomeStatementRow()">OK</b-button>
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
import { BalanceDTO } from '../../../openapi/model/balanceDTO';
import { IncomeStatementDTO } from '../../../openapi/model/incomeStatementDTO';
import { AddBalanceDTO } from '../../../openapi/model/addBalanceDTO';
import { PaymentMethod } from '../../../openapi/model/paymentMethod';
import { IncomeStatement } from '../../../openapi/model/incomeStatement';
import { AddIncomeStatementDTO } from '../../../openapi/model/addIncomeStatementDTO';

@Component({ })
export default class SettingsAccountancy extends Vue {
  private accountancyService: AccountancyService = openApiContainer.get<AccountancyService>('AccountancyService');

  private needBalanceData = true;
  private balanceItems: BalanceDTO[] = [];
  private balanceFields = [
    { key: 'code', sortable: true },
    { key: 'name', sortable: true },
    { key: 'startAssets', sortable: true },
    { key: 'startLiabilities', sortable: true },
  ];

  private editBalance: BalanceDTO = {
    id: 0,
    code: 0,
    name: '',
    startAssets: 0,
    startLiabilities: 0,
  };
  private addBalance: AddBalanceDTO = {
    code: 0,
    name: '',
    startAssets: 0,
    startLiabilities: 0,
  };

  private needIncomeStatementData = true;
  private incomeStatementItems: IncomeStatementDTO[] = [];
  private incomeStatementFields = [
    { key: 'code', sortable: true },
    { key: 'name', sortable: true },
  ];

  private addIncomeStatement: AddIncomeStatementDTO = {
    name: '',
    code: 0,
  };
  private editIncomeStatement: IncomeStatement = {
    id: 0,
    name: '',
    code: 0,
  };

  private getBalanceData(ctx: any, callback: any) {
    if (this.balanceItems.length === 0 || this.needBalanceData) {
        this.accountancyService.getBalance('', '', 'response').subscribe((res: HttpResponse<BalanceDTO[]>) => {
            this.balanceItems = res.response;
            this.needBalanceData = false;
            callback(res.response);
        }, this.handleGetError);
    } else {
        this.balanceItems.sort((a: any, b: any) => {
            let reverse = 1;
            if (ctx.sortDesc) {
                reverse = -1;
            }

            if (typeof a[ctx.sortBy] === 'number') {
                return (a[ctx.sortBy] - b[ctx.sortBy]) * reverse;
            }

            return String(a[ctx.sortBy]).localeCompare(String(b[ctx.sortBy])) * reverse;
        });

        callback(this.balanceItems);
    }
  }

  private getIncomeStatementData(ctx: any, callback: any) {
    if (this.incomeStatementItems.length === 0 || this.needIncomeStatementData) {
        this.accountancyService.getIncomeStatements('', '', 'response').subscribe((res: HttpResponse<IncomeStatementDTO[]>) => {
            this.incomeStatementItems = res.response;
            this.needIncomeStatementData = false;
            callback(res.response);
        }, this.handleGetError);
    } else {
        this.incomeStatementItems.sort((a: any, b: any) => {
            let reverse = 1;
            if (ctx.sortDesc) {
                reverse = -1;
            }

            if (typeof a[ctx.sortBy] === 'number') {
                return (a[ctx.sortBy] - b[ctx.sortBy]) * reverse;
            }

            return String(a[ctx.sortBy]).localeCompare(String(b[ctx.sortBy])) * reverse;
        });

        callback(this.incomeStatementItems);
    }
  }

  private showAddBalanceRowModal() {
    (this.$refs['add-balance-modal'] as any).show();
  }
  private showEditBalanceRowModal(balance: BalanceDTO) {
    this.editBalance = balance;
    (this.$refs['edit-balance-modal'] as any).show();
  }
  private showAddIncomeStatementModal() {
    (this.$refs['add-income-statement-modal'] as any).show();
  }
  private openEditIncomeStatementRowModal(incomeStatement: IncomeStatement) {
    this.editIncomeStatement = incomeStatement;
    (this.$refs['edit-income-statement-modal'] as any).show();
  }

  private addBalanceRow() {
    this.accountancyService.addBalance(this.addBalance, 'response').subscribe(() => {
      this.addBalance = { code: 0, name: '', startAssets: 0, startLiabilities: 0 };
      this.needBalanceData = true;

      this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
      (this.$refs['balance-table'] as any).refresh();

    }, this.handleError);
  }

  private editBalanceRow() {
    const model: AddBalanceDTO = {
      name: this.editBalance.name,
      code: this.editBalance.code!,
      startAssets: this.editBalance.startAssets,
      startLiabilities: this.editBalance.startLiabilities,
    };

    this.accountancyService.editBalance(this.editBalance.id, model, 'response').subscribe(() => {
      this.editBalance = { id: 0, code: 0, name: '', startAssets: 0, startLiabilities: 0 };
      this.needBalanceData = true;

      this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
      (this.$refs['balance-table'] as any).refresh();
      (this.$refs['edit-balance-modal'] as any).hide();

    }, this.handleError);
  }

  private deleteBalanceRow() {
    this.accountancyService.deleteBalance(this.editBalance.id, 'response').subscribe(() => {
      this.needBalanceData = true;
      (this.$refs['balance-table'] as any).refresh();
      (this.$refs['edit-balance-modal'] as any).hide();
      this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});

    }, () => {
      this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
    });
  }

  private addIncomeStatementRow() {
    this.accountancyService.addIncomeStatement(this.addIncomeStatement, 'response').subscribe(() => {
      this.addIncomeStatement = { code: 0, name: '' };
      this.needIncomeStatementData = true;

      this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
      (this.$refs['income-statement-table'] as any).refresh();

    }, this.handleError);
  }

  private editIncomeStatementRow() {
    const model: AddIncomeStatementDTO = {
      name: this.editIncomeStatement.name,
      code: this.editIncomeStatement.code,
    };

    this.accountancyService.editIncomeStatement(this.editIncomeStatement.id, model, 'response').subscribe(() => {
      this.editIncomeStatement = { id: 0, code: 0, name: '' };
      this.needIncomeStatementData = true;

      this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});
      (this.$refs['income-statement-table'] as any).refresh();
      (this.$refs['edit-income-statement-modal'] as any).hide();

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
      this.$notify({group: 'foo', text: this.$t('error.api_not_activated').toString() + ' <a href="/dashboard/accountancy/activate">' + this.$t('error.api_not_activated_link_text').toString() + '</a>', type: 'error', duration: 60000});
    } else {
      this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
    }
  }

  private deleteIncomeStatementRow() {
    this.accountancyService.deleteIncomeStatement(this.editIncomeStatement.id, 'response').subscribe(() => {
      this.needIncomeStatementData = true;
      (this.$refs['income-statement-table'] as any).refresh();
      (this.$refs['edit-income-statement-modal'] as any).hide();
      this.$notify({group: 'foo', text: this.$t('success').toString(), type: 'success'});

    }, () => {
      this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
    });
  }
}
</script>
<style lang="scss">
</style>

<i18n src="@/lang/views/admin/accountancyAdmin.json"></i18n>