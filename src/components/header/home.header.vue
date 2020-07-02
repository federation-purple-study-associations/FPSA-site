<template scoped>
  <b-navbar toggleable="lg" class="header">
    <b-navbar-brand to="/">
      <b>Federation of Purple Study Associations</b>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/agenda">{{$t('agenda')}}</b-nav-item>
        <b-nav-item to="/board">{{$t('board')}}</b-nav-item>
        <b-nav-item to="/contact">{{$t('contact')}}</b-nav-item>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <b-icon-chat-square-dots></b-icon-chat-square-dots>
          </template>

          <b-dropdown-item v-on:click="switchLanguage('nl')">Nederlands</b-dropdown-item>
          <b-dropdown-item v-on:click="switchLanguage('en')">English</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

    <!-- <el-menu mode="horizontal" class="header-navigation" :default-active="window.location.pathname" router>
      <el-menu-item index="" class="header-navigation__responsive" @click="toggleMenu"><i class="el-icon-more-outline"></i></el-menu-item>
      <el-menu-item index="/agenda" :class="menu ? 'responsive' : ''" @click="toggleMenu">{{$t('agenda')}}</el-menu-item>
      <el-menu-item index="/board" :class="menu ? 'responsive' : ''" @click="toggleMenu">{{$t('board')}}</el-menu-item>
      <el-menu-item index="/contact" :class="menu ? 'responsive' : ''" @click="toggleMenu">{{$t('contact')}}</el-menu-item>
      <el-submenu index="" :class="menu ? 'responsive' : ''">
        <template slot="title"><i class="el-icon-chat-dot-round"></i></template>
        <el-menu-item index="" v-on:click="switchLanguage('nl')">Nederlands</el-menu-item>
        <el-menu-item index="" v-on:click="switchLanguage('en')">English</el-menu-item>
      </el-submenu>
      <el-popover placement="bottom" width="160" trigger="hover" :class="(menu ? 'responsive' : '') + ' login-menu'" v-if="!isLoggedIn">
        <el-input placeholder="Email" v-model="loginForm.email" autocomplete="email"></el-input>
        <el-input placeholder="Wachtwoord" class="login-menu__password" v-model="loginForm.password" show-password autocomplete="current-password"></el-input>
        <el-button type="primary" class="login-menu__submit" :loading="isLoading" @click="submitLogin">{{$t('login')}}</el-button>
        <el-button slot="reference" type="text" class="login-menu__icon" icon="el-icon-user"></el-button>
      </el-popover>
      <el-menu-item index="/admin" v-if="isLoggedIn" :class="menu ? 'responsive' : ''" @click="toggleMenu"><i class="el-icon-user"></i></el-menu-item>
      <div :class="(menu ? 'responsive' : '') + ' header-navigation__background'"></div>
    </el-menu> -->
  </b-navbar>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { LoginDTO } from '../../openapi/model/loginDTO';
import openApiContainer from '../../openapi.container';
import { UserService } from '../../openapi/api/user.service';
import HttpResponse from '../../openapi/HttpResponse';

@Component({})
export default class HomeHeader extends Vue {
  private window = window;
  private isLoading = false;
  private menu = false;
  private loginForm: LoginDTO = {
    email: '',
    password: '',
  };
  private isLoggedIn = false;

  public async mounted() {
    this.isLoggedIn = await this.$store.dispatch('isLoggedIn');
  }

  private switchLanguage(lang: string): void {
    this.$store.dispatch('setLanguage', lang);
  }

  private toggleMenu() {
    this.menu = !this.menu;
  }

  private submitLogin() {
    this.isLoading = true;
    openApiContainer.get<UserService>('UserService').login(this.loginForm, 'response').subscribe(
      () => {
        window.location.href = '/admin';
      },
      (err: HttpResponse) => {
        this.isLoading = false;

        if (err.status === 400) {
          this.$message.error(this.$t('error.wrong_credentials').toString());

        } else {
          this.$message.error(this.$t('error.unknown').toString());
        }
      },
    );
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
}
</style>

<i18n src="@/lang/components/header.json"></i18n>
