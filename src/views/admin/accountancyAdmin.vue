<template scoped>
  <b-container>
      <b-tabs class="mt-3">
        <AccountancyBalance/>
        <IncomeStatement/>
        <ImportAccountancy/>
        <MutationAccountancy/>
        <SettingsAccountancy/>
      </b-tabs>
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AccountancyService } from '../../openapi/api/accountancy.service';
import openApiContainer from '@/openapi.container';
import { ActivationLinkDTO } from '../../openapi/model/activationLinkDTO';
import HttpResponse from '../../openapi/HttpResponse';
import SettingsAccountancy from './accountancy/settings.vue';
import MutationAccountancy from './accountancy/addMutation.vue';
import AccountancyBalance from './accountancy/balans.vue';
import ImportAccountancy from './accountancy/import.vue';
import IncomeStatement from './accountancy/incomeStatement.vue';

@Component({
  components: {
    SettingsAccountancy,
    MutationAccountancy,
    AccountancyBalance,
    ImportAccountancy,
    IncomeStatement,
  },
})
export default class AccountancyAdmin extends Vue { }
</script>