<template scoped>
  <b-navbar toggleable="lg" class="header">
    <b-navbar-brand to="/">
      <img src="/logo.svg" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav class="dark-background">
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/admin">{{$t('start')}}</b-nav-item>
        <b-nav-item to="/admin/website" v-if="hasPermissionForAgenda || hasPermissionForBoard || hasPermissionForUser">{{$t('website')}}</b-nav-item>
        <b-nav-item to="/admin/administration">{{$t('administration')}}</b-nav-item>

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

  public async mounted() {
    this.isLoggedIn = await this.$store.dispatch('isLoggedIn');
    this.hasPermissionForUser = this.$store.getters.hasPermission('User:Read');
    this.hasPermissionForAgenda = this.$store.getters.hasPermission('Agenda:Write');
    this.hasPermissionForBoard = this.$store.getters.hasPermission('Board:Write');
  }

  private switchLanguage(lang: string): void {
    this.$store.dispatch('setLanguage', lang);
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: rgba(93,0,137);
  height: 100px;
  font-size: 20px;

  & a.navbar-brand img {
    margin-left: 25px;
    width: 75px;
  }

  .nav-item {
    color: $color-primary;
  }

  &__language {
    margin-left: 20px;
  }
}

#nav-collapse {
  z-index: 999;
  background: $color-active;
}

@media (max-width: 992px) {
  .header__language {
    margin-left: 0px;
  }
}
</style>

<i18n src="@/lang/components/header.json"></i18n>
