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

        <b-nav-item-dropdown right class="header__language">
          <template v-slot:button-content>
            <b-icon-chat-square-dots></b-icon-chat-square-dots>
          </template>

          <b-dropdown-item v-on:click="switchLanguage('nl')">Nederlands</b-dropdown-item>
          <b-dropdown-item v-on:click="switchLanguage('en')">English</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right v-if="!isLoggedIn">
          <template v-slot:button-content>
            <b-icon-people></b-icon-people>
          </template>

          <b-dropdown-form>
            <b-form-group >
              <b-form-input :placeholder="$t('login.email')" v-model="loginForm.email" autocomplete="email"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="password" :placeholder="$t('login.password')" v-model="loginForm.password" autocomplete="current-password"></b-form-input>
            </b-form-group>
            <b-button variant="primary" @click="submitLogin">{{$t('login.action')}}</b-button>
          </b-dropdown-form>
        </b-nav-item-dropdown>

        <b-nav-item to="/admin" v-if="isLoggedIn"><b-overlay :show="isLoading" rounded="sm"><b-icon-people></b-icon-people></b-overlay></b-nav-item>
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
export default class HomeHeader extends Vue {
  private isLoading = false;
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
