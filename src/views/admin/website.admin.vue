<template scoped>
  <b-container>
      <b-tabs class="pt-3">
        <UserAdmin />
        <AgendaAdmin />
        <BoardAdmin />
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
export default class WebsiteAdmin extends Vue { }
</script>
