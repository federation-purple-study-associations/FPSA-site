<template scoped>
  <b-container class="contact">
    <b-row>
      <b-col>
        <b-card :title="$t('contact.title')" class="mb-3 mt-3">
          <p>
            <b>{{$t('contact.visit_address')}}</b><br>
            Rachelsmolen 1,<br>
            5612MA, Eindhoven<br>
            <br>
            <b>{{$t('contact.email')}}</b> <a href="mailto:info@fpsa.nl">info@fpsa.nl</a><br>
            <b>{{$t('contact.kvk')}}</b> 78356830
          </p>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card :title="$t('application.title')" class="mb-3 mt-3" id="application">
          <b-form>
            <b-form-group :label="$t('application.name')">
              <b-form-input v-model="application.name"  v-on:input="checkLegal"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('application.email')">
              <b-form-input v-model="application.email"  v-on:input="checkLegal"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('application.email_confirmation')">
              <b-form-input v-model="repeatEmail"  v-on:input="checkLegal"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('application.academy')">
              <b-form-input v-model="application.academy"  v-on:input="checkLegal"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('application.establishment')">
              <b-form-input v-model="application.establishment"  v-on:input="checkLegal"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('application.kvk')">
              <b-form-input type="number" v-model="application.kvk" v-on:input="checkLegal" min="0"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox v-model="privacy" v-on:input="checkLegal">{{$t('application.privacy')}}<a href="privacy.pdf" target="_blank">Link</a></b-form-checkbox>
            </b-form-group>
            <b-button variant="primary" :disabled="isIllegal || loading" @click="submitForm()"><b-overlay :show="loading" rounded="sm">{{$t('application.confirm')}}</b-overlay></b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import openApiContainer from '@/openapi.container';
import HttpResponse from '../openapi/HttpResponse';
import { NewApplication } from '../openapi/model/newApplication';
import { UserService } from '../openapi/api/user.service';

@Component({})
export default class Contact extends Vue {
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

  private readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
}
</script>

<style lang="scss" scoped>
</style>

<i18n src="@/lang/views/contact.json"></i18n>
