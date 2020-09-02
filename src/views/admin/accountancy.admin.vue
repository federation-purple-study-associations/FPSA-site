<template scoped>
  <b-container>
      <b-tabs class="pt-3">
        <AccountancyBalance/>
        <IncomeStatement/>
        <MutationAccountancy/>
        <AssetsAccountancy/>
        <ImportAccountancy v-if="hasWritePermission"/>
        <AddMutationAccountancy v-if="hasWritePermission"/>
        <SettingsAccountancy v-if="hasWritePermission"/>
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
import AddMutationAccountancy from './accountancy/addMutation.vue';
import AccountancyBalance from './accountancy/balance.vue';
import ImportAccountancy from './accountancy/import.vue';
import IncomeStatement from './accountancy/incomeStatement.vue';
import MutationAccountancy from './accountancy/mutations.vue';
import AssetsAccountancy from './accountancy/assets.vue';

@Component({
  components: {
    SettingsAccountancy,
    AddMutationAccountancy,
    AccountancyBalance,
    ImportAccountancy,
    IncomeStatement,
    MutationAccountancy,
    AssetsAccountancy,
  },
})
export default class AccountancyAdmin extends Vue {
  private hasWritePermission = false;

  public async mounted() {
    this.hasWritePermission = this.$store.getters.hasPermission('Accountancy:Write');
  }
}
</script>