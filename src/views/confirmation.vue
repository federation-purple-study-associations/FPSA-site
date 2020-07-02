<template scoped>
  <div class="confirmation">
      <div class="confirmation__center">
          <h2 class="fpsa-header">{{$t('title')}}</h2>
          <b-form>
            <b-form-group :label="$t('password')">
                <b-form-input type="password" autocomplete="new-password" required v-model="form.password"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('password_repeat')">
                <b-form-input type="password" autocomplete="new-password" v-model="repeatPassword"></b-form-input>
            </b-form-group>
            <b-button class="confirmation__submit" variant="primary" @click="submit">{{$t('confirm')}}</b-button>
          </b-form>
      </div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AgendaSummaryDTO } from '@/openapi/model/agendaSummaryDTO';
import { AgendaAllDTO } from '@/openapi/model/agendaAllDTO';
import { AgendaService } from '@/openapi/api/agenda.service';
import openApiContainer from '@/openapi.container';
import moment from 'moment';
import HttpResponse from '../openapi/HttpResponse';
import { AgendaDetailsDTO } from '../openapi/model/agendaDetailsDTO';
import { UserActivateDTO } from '../openapi/model/userActivateDTO';
import { UserService } from '../openapi/api/user.service';

@Component({})
export default class Confirmation extends Vue {
    private repeatPassword = '';
    private form: UserActivateDTO = {
        password: '',
        token: new URLSearchParams(window.location.search.substring(1)).get('token') || '',
    };

    private submit() {
        if (this.repeatPassword !== this.form.password || this.form.password === '') {
            this.$message.error(this.$t('error.password_not_match').toString());

        } else {
            openApiContainer.get<UserService>('UserService').activate(this.form, 'response').subscribe(() => {
                window.location.href = '/';
            }, (res: HttpResponse) => {
                if (res.status === 400) {
                    this.$message.error(this.$t('error.form_not_filled_in_correctly').toString());

                } else if (res.status === 404) {
                    this.$message.error(this.$t('error.invalid_token').toString());

                } else {
                    this.$message.error(this.$t('error.unknown').toString());
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.confirmation {
    &__center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &__submit {
        float: right;
    }
}
</style>

<i18n src="@/lang/views/confirmation.json"></i18n>
