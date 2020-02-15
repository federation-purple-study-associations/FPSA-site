<template scoped>
  <el-header class="header">
    <div>
      <router-link to="/">
        <img src="@/assets/logo.svg" />
      </router-link>
    </div>
    <el-menu mode="horizontal" class="header-navigation" :default-active="window.location.pathname" router>
      <el-menu-item index="/">{{$t('home')}}</el-menu-item>
      <el-menu-item index="/agenda">{{$t('agenda')}}</el-menu-item>
      <el-submenu index="/">
        <template slot="title"><i class="el-icon-chat-dot-round"></i></template>
        <el-menu-item index="" v-on:click="switchLanguage('nl')">Nederlands</el-menu-item>
        <el-menu-item index="" v-on:click="switchLanguage('en')">English</el-menu-item>
      </el-submenu>
      <el-popover placement="bottom" width="160" trigger="hover" class="login-menu">
        <el-input placeholder="Email" v-model="loginForm.email" autocomplete="email"></el-input>
        <el-input placeholder="Wachtwoord" class="login-menu__password" v-model="loginForm.password" show-password autocomplete="current-password"></el-input>
        <el-button type="primary" class="login-menu__submit" :loading="isLoading" @click="submitLogin">{{$t('login')}}</el-button>
        <el-button slot="reference" type="text" class="login-menu__icon" icon="el-icon-user"></el-button>
    </el-popover>
    </el-menu>
  </el-header>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { LoginDTO } from '../openapi/model/loginDTO';
import openApiContainer from '../openapi.container';
import { UserService } from '../openapi/api/user.service';
import HttpResponse from '../openapi/HttpResponse';

@Component({})
export default class Header extends Vue {
  private window = window;
  private isLoading = false;
  private loginForm: LoginDTO = {
    email: '',
    password: ''
  };

  private switchLanguage(lang: string): void {
    this.$store.dispatch('setLanguage', lang);
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
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #e6e6e6;
  z-index: 999;

  & .el-submenu {
    width: 60px;

    & .el-icon-chat-dot-round {
      margin-right: 0px;
    }
  }

  & img {
    margin-left: 10px;
    margin-top: 5px;
    height: 50px;
  }

  & &-navigation {
    border-bottom: none;

    & a {
      text-decoration: none;
    }
  }
}

.login-menu {
    &__icon {
      width: 60px;
      height: 60px;
      font-size: 18px;
      color: #909399;
    }

    &__password {
      margin-top: 5px;
    }

    &__submit {
      margin-top: 10px;
      float: right;
    }
  }
</style>

<i18n src="@/lang/components/header.json"></i18n>
