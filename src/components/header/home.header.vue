<template scoped>
  <b-navbar toggleable="lg" class="header">
    <b-navbar-brand to="/">
      <img src="/logo.svg" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav class="dark-background">
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/agenda">{{$t('agenda')}}</b-nav-item>
        <b-nav-item to="/board">{{$t('board')}}</b-nav-item>
        <b-nav-item to="/members">{{$t('members')}}</b-nav-item>
        <b-nav-item to="/contact">{{$t('contact')}}</b-nav-item>
        <b-nav-item to="/application" class="text-active">{{$t('register')}}</b-nav-item>

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
          <b-dropdown-item-button><router-link to="/forgot" style="color: black !important">{{$t('forgot_password')}}</router-link></b-dropdown-item-button>
        </b-nav-item-dropdown>

        <b-nav-item to="/admin" v-else><b-overlay :show="isLoading" rounded="sm"><b-icon-people></b-icon-people></b-overlay></b-nav-item>
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
  private document = document;
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
        this.$router.push('/admin');
      },
      (err: HttpResponse) => {
        this.isLoading = false;

        if (err.status === 400) {
          this.$notify({group: 'foo', text: this.$t('error.wrong_credentials').toString(), type: 'error'});

        } else {
          this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
        }
      },
    );
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: rgba(93,0,137);
  height: 100px;
  font-size: 20px;

  .text-active a {
    color: $color-primary !important;
  }
  
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
