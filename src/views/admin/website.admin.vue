<template scoped>
  <b-container>
      <b-tabs class="pt-3">
        <AgendaAdmin v-if="hasPermissionForAgenda"/>
        <BoardAdmin v-if="hasPermissionForBoard"/>
        <UserAdmin v-if="hasPermissionForUser"/>
      </b-tabs>
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import AgendaAdmin from './website/agenda.admin.vue';
import BoardAdmin from './website/board.admin.vue';
import UserAdmin from './website/user.admin.vue';

@Component({
  components: {
    AgendaAdmin,
    BoardAdmin,
    UserAdmin,
  },
})
export default class WebsiteAdmin extends Vue {
  private hasPermissionForUser = false;
  private hasPermissionForAgenda = false;
  private hasPermissionForBoard = false;

  public async mounted() {
    this.hasPermissionForUser = this.$store.getters.hasPermission('User:Read');
    this.hasPermissionForAgenda = this.$store.getters.hasPermission('Agenda:Write');
    this.hasPermissionForBoard = this.$store.getters.hasPermission('Board:Write');
  }
}
</script>
