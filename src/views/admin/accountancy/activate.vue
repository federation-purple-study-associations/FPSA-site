<template scoped>
  <div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AccountancyService } from '../../../openapi/api/accountancy.service';
import openApiContainer from '@/openapi.container';
import { ActivationLinkDTO } from '../../../openapi/model/activationLinkDTO';
import HttpResponse from '../../../openapi/HttpResponse';

@Component({
  components: { },
})
export default class ActivateAccountancy extends Vue {
    private accountancyService: AccountancyService = openApiContainer.get<AccountancyService>('AccountancyService');

    constructor() {
        super();

        const code = new URLSearchParams(window.location.search.substring(1)).get('code');
        if (code) {
            this.accountancyService.activateApi({ code }, 'response').subscribe((res: HttpResponse) => {
                this.$router.push('admin/accountancy');

            }, (err) => {
                this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
            });

        } else {
            this.accountancyService.getActivationLink('response').subscribe((res: HttpResponse<ActivationLinkDTO>) => {
                window.location.href = res.response.href;
            });
        }
    }
}
</script>

<i18n src="@/lang/views/admin/accountancyAdmin.json"></i18n>