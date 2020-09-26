<template scoped>
  <b-container>
      <b-tabs class="pt-3">
        <OverviewActivityPlan />
        <OverviewAnnualReport />
      </b-tabs>
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import OverviewActivityPlan from './administration/overview.activity.plan.vue';
import OverviewAnnualReport from './administration/overview.annual.report.vue';

@Component({
  components: {
    OverviewActivityPlan,
    OverviewAnnualReport,
  },
})
export default class AdministrationAdmin extends Vue { }
</script>
