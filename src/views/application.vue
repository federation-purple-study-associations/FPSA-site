<template scoped>
    <div class="contact">
    <div class="page__heading dark-background">
      <b-container class="h-100">
        <b-row align-h="between" align-v="center" class="h-100">
          <b-col md>
            <h1>{{$t('title')}}</h1>
          </b-col>
          <b-col class="page__heading-text" md>{{$t('description')}}</b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row ref="register">
        <b-col>
          <b-card :title="$t('title')" class="mb-3 mt-3" id="application">
            <b-form>
              <b-form-group :label="$t('name')">
                <b-form-input v-model="application.name"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('email')">
                <b-form-input v-model="application.email"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('email_confirmation')">
                <b-form-input v-model="repeatEmail"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('academy')">
                <b-form-input v-model="application.academy"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('establishment')">
                <b-form-input v-model="application.establishment"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('kvk')">
                <b-form-input type="number" v-model="application.kvk" v-on:input="checkLegal" min="0"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox v-model="privacy" v-on:input="checkLegal">{{$t('privacy')}}<a href="privacy.pdf" target="_blank" class="contact--privacy">Link</a></b-form-checkbox>
              </b-form-group>
              <b-button variant="primary" :disabled="isIllegal || loading" @click="submitForm()"><b-overlay :show="loading" rounded="sm">{{$t('confirm')}}</b-overlay></b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { ContactFormDTO } from '@/openapi/model/contactFormDTO';
import { UserService } from '@/openapi/api/user.service';
import openApiContainer from '@/openapi.container';
import { NewApplication } from '@/openapi/model/newApplication';

@Component({})
export default class Application extends Vue {
  private readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private application: NewApplication = {
    name: '',
    email: '',
    academy: '',
    establishment: '',
    kvk: 0,
  };
  private repeatEmail = '';

  private isIllegal = true;
  private privacy = false;
  private loading = false;

  private userService: UserService = openApiContainer.get<UserService>('UserService');

  private checkLegal() {
    this.isIllegal =  this.application.name === '' ||
                      this.application.email === '' ||
                      this.application.email !== this.repeatEmail ||
                      !this.emailRegex.test(this.application.email) ||
                      this.application.academy === '' ||
                      this.application.establishment === '' ||
                      this.application.kvk === 0 ||
                      !this.privacy;
  }

  private submitForm() {
    this.loading = true;
    this.application.kvk = +this.application.kvk;

    openApiContainer.get<UserService>('UserService').applicationCreate(this.application, 'response').subscribe(() => {
      this.$notify({group: 'foo', text: this.$t('application.successful').toString(), type: 'success'});
      this.application = {name: '', email: '', academy: '', establishment: '', kvk: 0};
      this.repeatEmail = '';
      this.privacy = false;
      this.loading = false;

    }, (err) => {
      this.loading = false;
      if (err.status === 400) {
        this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});

      } else {
        this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
      }
    });
  }
}
</script>

<style lang="scss" scoped>

</style>

<i18n src="@/lang/views/application.json"></i18n>
