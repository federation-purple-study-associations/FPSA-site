<template scoped>
  <b-tab :title="$t('titles.board_grant')">
    <b-container class="board-grant">
      <b-row>
        <b-col sm="9" class="mb-3 mt-3">
          {{$t('explanations.board_grant')}}
          <ul>
            <li>{{$t('dialog.checklist.board')}}</li>
            <li>{{$t('dialog.checklist.kvk')}}</li>
            <li>{{$t('dialog.checklist.members')}}</li>
            <li>{{$t('dialog.checklist.code_of_conduct')}}</li>
            <li>{{$t('dialog.checklist.statutes')}}</li>
            <li>{{$t('dialog.checklist.checklist')}}</li>
          </ul>
          <b>{{$t('explanations.board_grant_note')}}</b>
        </b-col>
        <b-col class="mb-3 mt-3 text-right">
          <b-button @click="openAddDialog" variant="outline-primary">{{$t('add')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover sticky-header ref="tableGrants" :items="getGrants" :fields="fieldsGrants" class="clickable" @row-clicked="rowClicked">
            <template #cell(checked)="data">
              {{ data.item.checkedAt ? $t('table.yes') + ' (' + moment(data.item.checkedAt).format('DD-MM-YYYY') + ')' : $t('table.no') }}
            </template>
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
            <b-form-group :label="$t('table.delivered')" v-if="edit">
              <b-form-datepicker v-model="boardGrant.delivered" disabled></b-form-datepicker>
            </b-form-group>
            <b-form-group :label="$t('table.checked')" v-if="edit && hasFPSARights">
              <b-form-checkbox :checked="boardGrant.checked" disabled></b-form-checkbox>
            </b-form-group>
            <b-form-group :label="$t('table.checked_at')" v-if="edit && hasFPSARights">
              <b-form-datepicker v-model="boardGrant.checkedAt" disabled></b-form-datepicker>
            </b-form-group>
            <b-form-group :label="$t('table.remarks')">
              <b-form-textarea v-model="boardGrant.remarks"></b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('table.document')">
              <b-form-file :placeholder="edit ? $t('dialog.document_note') : ''" v-model="boardGrantDocument"></b-form-file>
            </b-form-group>
            <a :href="url + '/administration/boardGrant/' + boardGrant.id + '/document'" target="_blank" v-if="edit"><b-icon-paperclip/>Download</a><br>
          </b-form>
          <template v-slot:modal-footer>
            <div class="w-100 text-right">
              <b-button variant="secondary" v-if="edit && hasFPSARights" @click="checkedItem" class="mr-2">{{$t('dialog.complete')}}</b-button>
              <b-button variant="danger" v-if="edit" @click="deleteItem" class="mr-2">{{$t('dialog.delete')}}</b-button>
              <b-button variant="dark" @click="dialogActivityVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
              <b-button variant="secondary" @click="dialogConfirmationVisible = true">{{$t('dialog.confirm')}}</b-button>
            </div>
          </template>
    </b-modal>

    <b-modal :visible.sync="dialogConfirmationVisible" :title="$t('dialog.title_confirmation')">
      <div>
        <b>
          {{$t('dialog.confirmation')}}
          <ul>
            <li>{{$t('dialog.checklist.board')}}</li>
            <li>{{$t('dialog.checklist.kvk')}}</li>
            <li>{{$t('dialog.checklist.members')}}</li>
            <li>{{$t('dialog.checklist.code_of_conduct')}}</li>
            <li>{{$t('dialog.checklist.statutes')}}</li>
            <li>{{$t('dialog.checklist.checklist')}}</li>
          </ul>
        </b>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100 text-right">
          <b-button variant="dark" @click="dialogConfirmationVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
          <b-button variant="secondary" @click="uploadDocument" :disabled="loading"><b-overlay :show="loading" rounded="sm">{{$t('dialog.confirm')}}</b-overlay></b-button>
        </div>
      </template>
    </b-modal>
  </b-tab>
</template>

<script lang="ts" scoped>
import openApiContainer from '@/openapi.container';
import { AdministrationService } from '@/openapi/api/administration.service';
import HttpResponse from '@/openapi/HttpResponse';
import { BoardGrant } from '@/openapi/model/boardGrant';
import { ResultActivityPlan } from '@/openapi/model/resultActivityPlan';
import { ResultBoardGrant } from '@/openapi/model/resultBoardGrant';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import { User } from '../../../openapi/model/user';

@Component({})
export default class OverviewBoardGrants extends Vue {
    private readonly administrationService = openApiContainer.get<AdministrationService>('AdministrationService');
    private fieldsGrants: any[] = [];
    private moment = moment;
    private readonly url: string | undefined = process.env.VUE_APP_API_URL;

    private dialogActivityVisible: boolean = false;
    private dialogConfirmationVisible: boolean = false;
    private edit: boolean = false;
    private loading: boolean = false;
    private boardGrant: BoardGrant = { id: 0, delivered: '', checked: false, checkedAt: '', remarks: '', user: {id: 0, email: '', nationality: User.NationalityEnum.Dutch, isSleeping: false, boardTransfer: '', websiteUrl: '', fullName: '', memberSince: '', academy: '', roleId: 0, establishment: '', kvk: 0, recieveEmailUpdatesEvents: false} };
    private boardGrantDocument?: Blob = new Blob();

    private count: number = 0;
    private pageSize: number = 25;
    private page: number = 1;

    private hasFPSARights: boolean = false;

    public mounted() {
        this.hasFPSARights = this.$store.getters.hasPermission('Administration:System');

        this.fieldsGrants = [
            {
                key: 'user.fullName',
                label: this.$t('table.name').toString(),
                sortable: true,
            },
            {
                key: 'delivered',
                label: this.$t('table.delivered').toString(),
                sortable: true,
            },
            {
              key: 'checked',
              label: this.$t('table.checked').toString(),
              sortable: true,
            },
        ];
    }

    private getGrants() {
        return new Promise((resolve) => {
            this.administrationService.boardGrantGetAll(0, 100, 'response').subscribe((res: HttpResponse<ResultBoardGrant>) => {
                res.response.boardGrants.forEach((grants) => {
                    grants.delivered = moment(grants.delivered).tz('UTC').format('DD-MM-YYYY HH:mm:ss');
                });

                resolve(res.response.boardGrants);
            });
        });
    }

    private changePage(index: number | null) {
      if (index) {
        (this.$refs.tablePlans as any).refresh();
      }
    }

    private rowClicked(record: BoardGrant, index: number) {
      const value = JSON.parse(JSON.stringify(record));
      value.delivered = moment(value.delivered, 'DD-MM-YYYY').toDate() as any;
      this.boardGrant = value;
      this.boardGrantDocument = undefined;

      this.edit = true;
      this.dialogActivityVisible = true;
    }

    private openAddDialog() {
      this.boardGrantDocument = undefined;
      this.boardGrant = { id: 0, delivered: '', checked: false, checkedAt: '', remarks: '', user: {id: 0, email: '', nationality: User.NationalityEnum.Dutch, isSleeping: false, websiteUrl: '', boardTransfer: '', fullName: '', memberSince: '', academy: '', roleId: 0, establishment: '', kvk: 0, recieveEmailUpdatesEvents: false} };

      this.edit = false;
      this.dialogActivityVisible = true;
    }

    private uploadDocument() {
      this.loading = true;

      if (!this.edit) {
        this.administrationService.boardGrantCreate(this.boardGrantDocument!, this.boardGrant.remarks, 'response')
          .subscribe(this.handleSucces, this.handleError);

      } else {
        this.administrationService.boardGrantUpdate(this.boardGrant.id, this.boardGrantDocument, this.boardGrant.remarks, 'response')
          .subscribe(this.handleSucces, this.handleError);
      }
    }

    private deleteItem() {
      this.administrationService.boardGrantDelete(this.boardGrant.id, 'response')
        .subscribe(this.handleSucces, this.handleError);
    }

    private checkedItem() {
      this.administrationService.boardGrantCheck(this.boardGrant.id, 'response')
        .subscribe(this.handleSucces, this.handleError);
    }

    private handleSucces() {
      this.$notify({group: 'foo', text: this.$t('action_success').toString(), type: 'success'});
      (this.$refs.tableGrants as any).refresh();
      this.dialogActivityVisible = false;
      this.dialogConfirmationVisible = false;
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
