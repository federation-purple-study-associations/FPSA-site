<template scoped>
  <b-tab :title="$t('title')">
    <b-container class="activity-plan">
        <b-row>
        <b-col class="mb-3 mt-3 w-100 text-right">
          <b-button @click="openLinkDialog" variant="outline-primary" class="mr-2">{{$t('handy_files')}}</b-button>
          <b-button @click="openAddDialog" variant="outline-primary">{{$t('add')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover sticky-header ref="tablePlans" :items="getPlans" :fields="fieldsPlans" class="clickable" @row-clicked="rowClicked">
          </b-table>
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
            <b-form-group :label="$t('table.activity_plan')">
              <b-form-file :placeholder="edit ? $t('dialog.activity_plan_note') : ''" v-model="activityPlanDocument"></b-form-file>
            </b-form-group>
          </b-form>
          <template v-slot:modal-footer>
            <div class="w-100 text-right">
              <b-button variant="danger" v-if="edit" @click="deleteItem" class="mr-2">{{$t('dialog.delete')}}</b-button>
              <b-button variant="dark" @click="dialogActivityVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
              <b-button variant="secondary" @click="submitDialog">{{$t('dialog.confirm')}}</b-button>
            </div>
          </template>
    </b-modal>

    <b-modal :title="$t('handy_files')" id="handyFiles" hide-footer>
      <a href="/format_activiteitenplan.docx" target="_blank"><b-icon-paperclip></b-icon-paperclip> {{$t('format')}}</a><br>
      <a href="/voorbeeld_activiteitenplan.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip> {{$t('example')}}</a>
    </b-modal>
  </b-tab>
</template>

<script lang="ts" scoped>
import openApiContainer from '@/openapi.container';
import { AdministrationService } from '@/openapi/api/administration.service';
import HttpResponse from '@/openapi/HttpResponse';
import { ActivityPlan } from '@/openapi/model/activityPlan';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class OverviewActivityPlan extends Vue {
    private readonly administrationService = openApiContainer.get<AdministrationService>('AdministrationService');
    private fieldsPlans: any[] = [];

    private dialogActivityVisible: boolean = false;
    private edit: boolean = false;
    private activityPlan: ActivityPlan = { id: 0, delivered: '', start: '', end: '', user: {id: 0, email: '', fullName: '', memberSince: '', academy: '', roleId: 0, establishment: '', kvk: 0, recieveEmailUpdatesEvents: false} };
    private activityPlanDocument?: Blob = new Blob();

    private dialogLinksVisible: boolean = false;

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
            this.administrationService.activityPlanGetAll(0, 100, 'response').subscribe((res: HttpResponse<ActivityPlan[]>) => {
                res.response.forEach((plan) => {
                    plan.start = moment(plan.start).format('DD-MM-YYYY');
                    plan.end = moment(plan.end).format('DD-MM-YYYY');
                    plan.delivered = moment(plan.delivered).tz('UTC').format('DD-MM-YYYY HH:mm:ss');
                });

                resolve(res.response);
            });
        });
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
      this.activityPlan = { id: 0, delivered: '', start: '', end: '', user: {id: 0, email: '', fullName: '', memberSince: '', academy: '', roleId: 0, establishment: '', kvk: 0, recieveEmailUpdatesEvents: false} };

      this.edit = false;
      this.dialogActivityVisible = true;
    }

    private submitDialog() {
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
    }

    private handleError(err: HttpResponse) {
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

<i18n src="@/lang/views/admin/activity.plan.json"></i18n>