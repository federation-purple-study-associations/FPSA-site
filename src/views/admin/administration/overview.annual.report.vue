<template scoped>
  <b-tab :title="$t('titles.annual_report')">
    <b-container class="annual-report">
        <b-row>
        <b-col class="mb-3 mt-3 w-100 text-right">
          <b-button class="mr-2" @click="openExplanationDialog" variant="outline-primary">{{$t('explanation')}}</b-button>
          <b-button @click="openAddDialog" variant="outline-primary">{{$t('add')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover sticky-header ref="tableReports" :items="getReports" :fields="fieldsReports" class="clickable" @row-clicked="rowClicked">
          </b-table>

          <b-pagination align="center" :total-rows="count" :per-page="pageSize" v-model="page" @input="changePage"></b-pagination>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
        :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')"
        :visible.sync="dialogAnnualVisible"
        no-close-on-backdrop
        hide-header-close
        scrollable>
          <b-form>
            <b-form-group :label="$t('table.activity_plan')">
                <b-form-select v-model="activityPlanId" :options="activityPlans">
                    <b-form-select-option v-if="activityPlans.length == 0" :value="null" disabled>{{$t('dialog.empty_activity_plans_note')}}</b-form-select-option>
                </b-form-select>
            </b-form-group>
            <b-form-group :label="$t('table.delivered')" v-if="edit">
              <b-form-datepicker v-model="annualReport.delivered" disabled></b-form-datepicker>
            </b-form-group>
            <b-form-group :label="$t('table.document')">
              <b-form-file :placeholder="edit ? $t('dialog.document_note') : ''" v-model="annualReportDocument"></b-form-file>
            </b-form-group>
            <a :href="url + '/administration/annualReport/' + annualReport.id + '/document'" target="_blank" v-if="edit"><b-icon-paperclip/>Download</a><br>
          </b-form>
          <template v-slot:modal-footer>
            <div class="w-100 text-right">
              <b-button variant="danger" v-if="edit" @click="deleteItem" class="mr-2">{{$t('dialog.delete')}}</b-button>
              <b-button variant="dark" @click="dialogAnnualVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
              <b-button variant="secondary" @click="submitDialog"><b-overlay :show="loading" rounded="sm">{{$t('dialog.confirm')}}</b-overlay></b-button>
            </div>
          </template>
    </b-modal>
  
    <b-modal :title="$t('explanation')" id="explanation_annual_report" hide-footer>
        {{$t('explanations.annual_report')}}
    </b-modal>
  </b-tab>
</template>

<script lang="ts" scoped>
import openApiContainer from '@/openapi.container';
import { AdministrationService } from '@/openapi/api/administration.service';
import HttpResponse from '@/openapi/HttpResponse';
import { ActivityPlan } from '@/openapi/model/activityPlan';
import { AnnualReport } from '@/openapi/model/annualReport';
import { ResultActivityPlan } from '@/openapi/model/resultActivityPlan';
import { ResultAnnualReport } from '@/openapi/model/resultAnnualReport';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class OverviewAnnualReport extends Vue {
    private readonly administrationService = openApiContainer.get<AdministrationService>('AdministrationService');
    private fieldsReports: any[] = [];
    private readonly url: string | undefined = process.env.VUE_APP_API_URL;

    private dialogAnnualVisible: boolean = false;
    private edit: boolean = false;
    private loading: boolean = false;
    private annualReport: AnnualReport = { id: 0, delivered: '' };
    private annualReportDocument?: Blob = new Blob();
    private activityPlanId: number = 0;
    private activityPlans: Array<{value: number, text: string}> = [];

    private count: number = 0;
    private pageSize: number = 25;
    private page: number = 1;

    public mounted() {
        this.fieldsReports = [
            {
                key: 'activityPlan.user.fullName',
                label: this.$t('table.name').toString(),
                sortable: true,
            },
            {
                key: 'activityPlan.start',
                label: this.$t('table.start').toString(),
                sortable: true,
            },
            {
                key: 'activityPlan.end',
                label: this.$t('table.end').toString(),
                sortable: true,
            },
            {
                key: 'delivered',
                label: this.$t('table.delivered').toString(),
                sortable: true,
            },
        ];

        this.administrationService.activityPlanGetAll(0, 100, true, 'response').subscribe((res: HttpResponse<ResultActivityPlan>) => {
            this.activityPlans = [];

            res.response.activityPlans.forEach((x) => {
                this.activityPlans.push({value: x.id, text: moment(x.start).tz('UTC').format('DD-MM-YYYY') + ' - ' + moment(x.end).tz('UTC').format('DD-MM-YYYY') });
            });
        });
    }

    private getReports() {
        return new Promise((resolve) => {
            this.administrationService.annualReportGetAll((this.page - 1) * this.pageSize, this.pageSize, 'response').subscribe((res: HttpResponse<ResultAnnualReport>) => {
                this.count = res.response.count;

                res.response.annualReports.forEach((plan) => {
                    plan.delivered = moment(plan.delivered).tz('UTC').format('DD-MM-YYYY HH:mm:ss');
                    plan.activityPlan!.start = moment(plan.activityPlan!.start).format('DD-MM-YYYY');
                    plan.activityPlan!.end = moment(plan.activityPlan!.end).format('DD-MM-YYYY');
                });

                resolve(res.response.annualReports);
            });
        });
    }

    private rowClicked(record: AnnualReport, index: number) {
      const value = JSON.parse(JSON.stringify(record));
      value.delivered = moment(value.delivered, 'DD-MM-YYYY').toDate() as any;
      this.annualReport = value;
      this.activityPlanId = value.activityPlan.id;
      this.annualReportDocument = undefined;

      this.edit = true;
      this.dialogAnnualVisible = true;
    }

    private changePage(index: number | null) {
      if (index) {
        (this.$refs.tableReports as any).refresh();
      }
    }

    private openExplanationDialog() {
      this.$bvModal.show('explanation_annual_report');
    }

    private openAddDialog() {
      this.annualReportDocument = undefined;
      this.annualReport = { id: 0, delivered: '' };

      this.edit = false;
      this.dialogAnnualVisible = true;
    }

    private submitDialog() {
      this.loading = true;

      if (!this.edit) {
        this.administrationService.annualReportCreate(this.activityPlanId, this.annualReportDocument!, 'response')
          .subscribe(this.handleSucces, this.handleError);

      } else {
        this.administrationService.annualReportUpdate(this.annualReport.id, this.activityPlanId, this.annualReportDocument, 'response')
          .subscribe(this.handleSucces, this.handleError);
      }
    }

    private deleteItem() {
      this.administrationService.annualReportDelete(this.annualReport.id, 'response')
        .subscribe(this.handleSucces, this.handleError);
    }

    private handleSucces() {
      this.$notify({group: 'foo', text: this.$t('action_success').toString(), type: 'success'});
      (this.$refs.tableReports as any).refresh();
      this.dialogAnnualVisible = false;
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
}
</script>

<style lang="scss" scoped>

</style>

<i18n src="@/lang/views/admin/administration.json"></i18n>
