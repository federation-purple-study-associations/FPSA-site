<template scoped>
  <b-navbar toggleable="lg" class="header">
    <b-navbar-brand to="/">
      <b v-if="document.getElementsByTagName('body')[0].clientWidth > 900">Federation of Purple Study Associations</b>
      <b v-else>FPSA</b>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/admin">{{$t('start')}}</b-nav-item>
        <b-nav-item to="/admin/user" v-if="hasPermissionForUser">{{$t('user')}}</b-nav-item>
        <b-nav-item to="/admin/agenda" v-if="hasPermissionForAgenda">{{$t('agenda')}}</b-nav-item>
        <b-nav-item to="/admin/board" v-if="hasPermissionForBoard">{{$t('board')}}</b-nav-item>
        <b-nav-item to="/admin/accountancy" v-if="hasPermissionForAccountancy">{{$t('accountancy')}}</b-nav-item>

        <b-nav-item-dropdown right class="header__language">
          <template v-slot:button-content>
            <b-icon-chat-square-dots></b-icon-chat-square-dots>
          </template>

          <b-dropdown-item v-on:click="switchLanguage('nl')">Nederlands</b-dropdown-item>
          <b-dropdown-item v-on:click="switchLanguage('en')">English</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { LoginDTO } from '../../openapi/model/loginDTO';
import openApiContainer from '../../openapi.container';
import { UserService } from '../../openapi/api/user.service';
import HttpResponse from '../../openapi/HttpResponse';

@Component({})
export default class AdminHeader extends Vue {
  private document = document;

  // Authentication
  private isLoggedIn = false;
  private hasPermissionForUser = false;
  private hasPermissionForAgenda = false;
  private hasPermissionForBoard = false;
  private hasPermissionForAccountancy = false;

  public async mounted() {
    this.isLoggedIn = await this.$store.dispatch('isLoggedIn');
    this.hasPermissionForUser = this.$store.getters.hasPermission('User:Read');
    this.hasPermissionForAgenda = this.$store.getters.hasPermission('Agenda:Write');
    this.hasPermissionForBoard = this.$store.getters.hasPermission('Board:Write');
    this.hasPermissionForAccountancy = this.$store.getters.hasPermission('Accountancy:Read');
  }

  private switchLanguage(lang: string): void {
    this.$store.dispatch('setLanguage', lang);
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #7C4DD8;
  border-bottom: solid 1px #e6e6e6;
  
  & a.navbar-brand {
    color: white;
  }

  &__language {
    margin-left: 20px;
  }
}

@media (max-width: 992px) {
  .header__language {
    margin-left: 0px;
  }
}
</style>

<i18n src="@/lang/components/header.json"></i18n>
