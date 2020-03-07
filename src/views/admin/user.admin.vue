<template scoped>
  <div class="user-admin">
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import openApiContainer from '../../openapi.container';
import HttpResponse from '../../openapi/HttpResponse';
import { UserService } from '../../openapi/api/user.service';

@Component({})
export default class BoardAdmin extends Vue {
  // Util
  private userService: UserService = openApiContainer.get<UserService>('UserService');
}
</script>

<style lang="scss" scoped>
.user-admin {
  
}

@media only screen and (max-width: 768px) {
  .user-admin {

  }
}
</style>

<i18n src="@/lang/views/admin/user.admin.json"></i18n>
