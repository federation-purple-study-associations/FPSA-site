<template scoped>
  <div class="confirmation">
      <div class="confirmation__center">
          <h2 class="fpsa-header">{{$t('title_forgot')}}</h2>
          <b-form>
            <b-form-group :label="$t('email')">
                <b-form-input type="email" autocomplete="email" required v-model="form.email"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('email_repeat')">
                <b-form-input type="email" autocomplete="email" required v-model="repeatEmail"></b-form-input>
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
import { UserForgotDTO } from '../openapi/model/userForgotDTO';
import { UserService } from '../openapi/api/user.service';

@Component({})
export default class ForgotPassword extends Vue {
    private repeatEmail = '';
    private form: UserForgotDTO = {
        email: '',
    };

    private submit() {
        if (this.repeatEmail !== this.form.email) {
            this.$notify({group: 'foo', text: this.$t('error.email_not_match').toString(), type: 'error'});

        } else if (this.form.email === '') {
            this.$notify({group: 'foo', text: this.$t('error.email_not_filled_in_correctly').toString(), type: 'error'});

        } else {
            openApiContainer.get<UserService>('UserService').userForgot(this.form, 'response').subscribe(() => {
                this.$notify({group: 'foo', text: this.$t('forgot_success').toString(), type: 'success'});

            }, (res: HttpResponse) => {
                if (res.status === 400) {
                    this.$notify({group: 'foo', text: this.$t('error.email_not_filled_in_correctly').toString(), type: 'error'});

                } else if (res.status === 404) {
                    this.$notify({group: 'foo', text: this.$t('error.invalid_email').toString(), type: 'error'});

                } else {
                    this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
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
