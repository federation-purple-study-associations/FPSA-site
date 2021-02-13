<template scoped>
  <b-tab :title="$t('titles.activity_plan')">
    <b-container class="activity-plan">
      <b-row>
        <b-col sm="9" class="mb-3 mt-3">
          {{$t('explanations.activity_plan')}}<br>
          <br>
          <a href="/format-activity-plan.docx" target="_blank"><b-icon-paperclip/>Format {{$t('titles.activity_plan')}}</a><br>
          <a href="/example-activity-plan.pdf" target="_blank"><b-icon-paperclip/>{{$t('explanations.example')}} {{$t('titles.activity_plan')}}</a><br>
        </b-col>
        <b-col class="mb-3 mt-3 text-right" sm="3">
          <b-button @click="openAddDialog" variant="outline-primary">{{$t('add')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover sticky-header ref="tablePlans" :items="getPlans" :fields="fieldsPlans" class="clickable" @row-clicked="rowClicked">
          </b-table>

          <b-pagination align="center" :total-rows="count" :per-page="pageSize" v-model="page" @input="changePage"></b-pagination>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
        :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')"
        :visible.sync="dialogActivityVisible"
        no-close-on-backdrop
        hide-header-close
        scrollable>
          <b-form>
            <b-form-group :label="$t('table.start')">
              <b-form-datepicker v-model="activityPlan.start"></b-form-datepicker>
            </b-form-group>
            <b-form-group :label="$t('table.end')">
              <b-form-datepicker v-model="activityPlan.end"></b-form-datepicker>
            </b-form-group>
            <b-form-group :label="$t('table.delivered')" v-if="edit">
              <b-form-datepicker v-model="activityPlan.delivered" disabled></b-form-datepicker>
            </b-form-group>
            <b-form-group :label="$t('table.document')">
              <b-form-file :placeholder="edit ? $t('dialog.document_note') : ''" v-model="activityPlanDocument"></b-form-file>
            </b-form-group>
            <a :href="url + '/administration/activityplan/' + activityPlan.id + '/document'" target="_blank" v-if="edit"><b-icon-paperclip/>Download</a><br>
          </b-form>
          <template v-slot:modal-footer>
            <div class="w-100 text-right">
              <b-button variant="danger" v-if="edit" @click="deleteItem" class="mr-2">{{$t('dialog.delete')}}</b-button>
              <b-button variant="dark" @click="dialogActivityVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
              <b-button variant="secondary" @click="submitDialog" :disabled="loading"><b-overlay :show="loading" rounded="sm">{{$t('dialog.confirm')}}</b-overlay></b-button>
            </div>
          </template>
    </b-modal>
  </b-tab>
</template>

<script lang="ts" scoped>
import openApiContainer from '@/openapi.container';
import { AdministrationService } from '@/openapi/api/administration.service';
import HttpResponse from '@/openapi/HttpResponse';
import { ActivityPlan } from '@/openapi/model/activityPlan';
import { ResultActivityPlan } from '@/openapi/model/resultActivityPlan';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class OverviewActivityPlan extends Vue {
    private readonly administrationService = openApiContainer.get<AdministrationService>('AdministrationService');
    private fieldsPlans: any[] = [];
    private readonly url: string | undefined = process.env.VUE_APP_API_URL;

    private dialogActivityVisible: boolean = false;
    private edit: boolean = false;
    private loading: boolean = false;
    private activityPlan: ActivityPlan = { id: 0, delivered: '', start: '', end: '', sendToCommission: '', user: {id: 0, email: '', fullName: '', boardTransfer: '', websiteUrl: '', memberSince: '', academy: '', roleId: 0, establishment: '', kvk: 0, recieveEmailUpdatesEvents: false} };
    private activityPlanDocument?: Blob = new Blob();

    private dialogLinksVisible: boolean = false;

    private count: number = 0;
    private pageSize: number = 25;
    private page: number = 1;

    public mounted() {
        this.fieldsPlans = [
            {
                key: 'user.fullName',
                label: this.$t('table.name').toString(),
                sortable: true,
            },
            {
                key: 'start',
                label: this.$t('table.start').toString(),
                sortable: true,
            },
            {
                key: 'end',
                label: this.$t('table.end').toString(),
                sortable: true,
            },
            {
                key: 'delivered',
                label: this.$t('table.delivered').toString(),
                sortable: true,
            },
        ];
    }

    private getPlans() {
        return new Promise((resolve) => {
            this.administrationService.activityPlanGetAll(0, 100, 'response').subscribe((res: HttpResponse<ResultActivityPlan>) => {
                res.response.activityPlans.forEach((plan) => {
                    plan.start = moment(plan.start).format('DD-MM-YYYY');
                    plan.end = moment(plan.end).format('DD-MM-YYYY');
                    plan.delivered = moment(plan.delivered).tz('UTC').format('DD-MM-YYYY HH:mm:ss');
                });

                resolve(res.response.activityPlans);
            });
        });
    }

    private changePage(index: number | null) {
      if (index) {
        (this.$refs.tablePlans as any).refresh();
      }
    }

    private rowClicked(record: ActivityPlan, index: number) {
      const value = JSON.parse(JSON.stringify(record));
      value.start = moment(value.start, 'DD-MM-YYYY').toDate() as any;
      value.end = moment(value.end, 'DD-MM-YYYY').toDate() as any;
      value.delivered = moment(value.delivered, 'DD-MM-YYYY').toDate() as any;
      this.activityPlan = value;
      this.activityPlanDocument = undefined;

      this.edit = true;
      this.dialogActivityVisible = true;
    }

    private openAddDialog() {
      this.activityPlanDocument = undefined;
      this.activityPlan = { id: 0, delivered: '', start: '', end: '', sendToCommission: '', user: {id: 0, email: '', fullName: '', boardTransfer: '', websiteUrl: '', memberSince: '', academy: '', roleId: 0, establishment: '', kvk: 0, recieveEmailUpdatesEvents: false} };

      this.edit = false;
      this.dialogActivityVisible = true;
    }

    private submitDialog() {
      this.loading = true;

      if (!this.edit) {
        this.administrationService.activityPlanCreate(this.activityPlan.start, this.activityPlan.end, this.activityPlanDocument!, 'response')
          .subscribe(this.handleSucces, this.handleError);

      } else {
        this.administrationService.activityPlanUpdate(this.activityPlan.id, this.activityPlan.start, this.activityPlan.end, this.activityPlanDocument, 'response')
          .subscribe(this.handleSucces, this.handleError);
      }
    }

    private deleteItem() {
      this.administrationService.activityPlanDelete(this.activityPlan.id, 'response')
        .subscribe(this.handleSucces, this.handleError);
    }

    private handleSucces() {
      this.$notify({group: 'foo', text: this.$t('action_success').toString(), type: 'success'});
      (this.$refs.tablePlans as any).refresh();
      this.dialogActivityVisible = false;
      this.loading = false;
    }

    private handleError(err: HttpResponse) {
      this.loading = false;

      if (err.status === 400) {
        this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});

      } else if (err.status === 412) {
        this.$notify({group: 'foo', text: this.$t('error.file_not_pdf').toString(), type: 'error'});

      } else {
        this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
      }
    }

    private openLinkDialog() {
      this.$bvModal.show('handyFiles');
    }
}
</script>

<style lang="scss" scoped>

</style>

<i18n src="@/lang/views/admin/administration.json"></i18n>
