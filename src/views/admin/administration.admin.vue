<template scoped>
  <b-container>
      <b-tabs class="pt-3">
        <OverviewActivityPlan />
      </b-tabs>
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import OverviewActivityPlan from './administration/overview.activity.plan.vue';

@Component({
  components: {
    OverviewActivityPlan,
  },
})
export default class AdministrationAdmin extends Vue {
}
</script>
