<template scoped>
  <div class="contact">
    <div class="spaceing"></div>

    <el-card class="box-card box-card--full-width">
      <div slot="header">
        <h2 class="fpsa-header">{{$t('contact.title')}}</h2>
      </div>
      <p>
        <b>{{$t('contact.visit_address')}}</b><br>
        Rachelsmolen 1,<br>
        5612MA, Eindhoven<br>
        <br>
        <b>{{$t('contact.email')}}</b> <a href="mailto:info@fpsa.nl">info@fpsa.nl</a><br>
        <b>{{$t('contact.kvk')}}</b> 
      </p>
    </el-card>

    <el-card class="box-card box-card--full-width" id="application">
      <div slot="header">
        <h2 class="fpsa-header">{{$t('application.title')}}</h2>
      </div>
      <el-form>
        <el-form-item :label="$t('application.name')">
          <el-input v-model="application.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('application.email')">
          <el-input v-model="application.email"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm()">{{$t('application.confirm')}}</el-button>
      </el-form>
    </el-card>
  </div>
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
  };

  private submitForm() {
    openApiContainer.get<UserService>('UserService').applicationCreate(this.application, 'response').subscribe(() => {
      this.$message.success(this.$t('application.successful').toString());
      this.application = {name: '', email: ''};

    }, (err) => {
      if (err.status === 400) {
        this.$message.error(this.$t('error.form_not_filled_in_correctly').toString());

      } else {
        this.$message.error(this.$t('error.unknown').toString());
      }
    });
  }
}
</script>

<style lang="scss" scoped>
</style>

<i18n src="@/lang/views/contact.json"></i18n>
