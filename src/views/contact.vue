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
      <b-row class="mb-3 mt-3">
        <b-col>
          <b>{{$t('visit_address')}}</b><br>
          Rachelsmolen 1,<br>
          5612MA, Eindhoven<br>
        </b-col>
        <b-col>
          <b>Email: </b> <a href="mailto:info@fpsa.nl" class="contact__email-link--add-underline">info@fpsa.nl</a><br>
          <b>KvK: </b> 78356830
        </b-col>
      </b-row>
      <b-row class="mb-3 mt-3">
        <b-col>
          <b-card :title="$t('form.title')" class="mb-3 mt-3" id="form">
            <b-form>
              <b-form-group :label="$t('form.name')">
                <b-form-input v-model="form.name"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('form.subject')">
                <b-form-input v-model="form.subject"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('form.email')">
                <b-form-input v-model="form.email"  v-on:input="checkLegal"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('form.message')">
                <b-form-textarea v-model="form.message"  v-on:input="checkLegal"></b-form-textarea>
              </b-form-group>
              <b-button variant="primary" :disabled="isIllegal || loading" @click="submitForm()"><b-overlay :show="loading" rounded="sm">{{$t('form.send')}}</b-overlay></b-button>
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

@Component({})
export default class Contact extends Vue {
  private readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private form: ContactFormDTO = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  private isIllegal: boolean = true;
  private loading: boolean = false;
  private userService: UserService = openApiContainer.get<UserService>('UserService');

  private checkLegal() {
    this.isIllegal = (
      this.form.name === '' ||
      this.form.subject === '' ||
      this.form.email === '' ||
      !this.emailRegex.test(this.form.email) ||
      this.form.message === ''
    );
  }

  private submitForm() {
    this.userService.contact(this.form, 'response').subscribe(() => {
      this.$notify({group: 'foo', text: this.$t('form.successful').toString(), type: 'success'});
      this.form = {name: '', email: '', subject: '', message: ''};
      this.loading = false;
      this.isIllegal = true;

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
.contact {
  &--privacy {
    color: $color-primary;
  }

  &__email-link--add-underline {
    text-decoration: underline;
  }
}
</style>

<i18n src="@/lang/views/contact.json"></i18n>
