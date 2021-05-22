<template scoped>
  <b-tab :title="$t('user')">
    <b-container class="user-admin">
      <b-row>
        <b-col class="mb-3 mt-3 w-100 text-right">
          <b-button @click="openContactMembersDialog" variant="outline-primary" v-if="hasWritePermission">{{$t('contact_member')}}</b-button>
          <b-button @click="exportMember" variant="outline-primary" class="ml-2">{{$t('export')}}</b-button>
          <b-button @click="openApplicationDialog" variant="outline-primary" class="ml-2" v-if="hasWritePermission">{{$t('applications.title')}}</b-button>
          <b-button @click="openAddDialog" variant="outline-primary" class="ml-2" v-if="hasWritePermission">{{$t('add')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover sticky-header ref="tableUsers" :items="getUsers" :fields="fieldsUsers" class="clickable" @row-clicked="rowClicked">
            <template v-slot:cell(isSleeping)="row">
              <b-form-checkbox disabled v-model="row.item.isSleeping" v-if="row.item.role !== 'FPSA' && row.item.role !== 'Fontys'"></b-form-checkbox>
            </template>
          </b-table>
        </b-col>
      </b-row>

      <b-modal
        :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')"
        :visible.sync="dialogUserVisible"
        no-close-on-backdrop
        scrollable
        hide-header-close>
          <b-form>
            <b-form-group :label="$t('fullName')">
              <b-form-input v-model="userForDialog.fullName"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('email')">
              <b-form-input v-model="userForDialog.email"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('academy')">
              <b-form-input v-model="userForDialog.academy"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('establishment')">
              <b-form-input v-model="userForDialog.establishment"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('kvk')">
              <b-form-input type="number" v-model.number="userForDialog.kvk"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('boardTransfer')">
              <b-form-input v-model="userForDialog.boardTransfer"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('nationality')">
              <b-form-select v-model="userForDialog.nationality" :options="selectOptionsNationality"></b-form-select>
            </b-form-group>
            <b-form-group :label="$t('isSleeping')">
              <b-form-checkbox v-model="userForDialog.isSleeping"></b-form-checkbox>
            </b-form-group>
            <b-form-group :label="$t('website')">
              <b-form-input v-model="userForDialog.websiteUrl"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('photo')">
              <b-form-file v-model="photo" accept="image/*"></b-form-file>
            </b-form-group>
            <b-form-group :label="$t('member_since')">
              <b-form-datepicker v-model="userForDialog.memberSince" disabled></b-form-datepicker>
            </b-form-group>
            <b-form-group :label="$t('role')">
              <b-form-select v-model="userForDialog.roleId" :options="selectOptions"></b-form-select>
            </b-form-group>
          </b-form>
          <template v-slot:modal-footer>
            <div class="w-100 text-right">
              <b-button variant="danger" v-if="edit" @click="deleteItem" class="mr-2">{{$t('dialog.delete')}}</b-button>
              <b-button variant="dark" @click="dialogUserVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
              <b-button variant="secondary" @click="submitDialog" :disabled="loading"><b-overlay :show="loading" rounded="sm">{{$t('dialog.confirm')}}</b-overlay></b-button>
            </div>
          </template>
      </b-modal>

      <b-modal
        :title="$t('applications.title')"
        :visible.sync="dialogApplicationsVisible"
        scrollable
        size="xl"
        hide-footer
        @hidden="dialogApplicationsVisible = false">
          <b-table :items="getApplications" ref="tableApplication" :fields="fieldsApplications" striped sticky-header>
            <template v-slot:cell(details)="row">
              <div class="text-right">
                <b-button variant="success" @click="acceptApplication(row.item.id)" size="small">{{$t('applications.accept')}}</b-button>
                <b-button variant="danger" @click="declineApplication(row.item.id)" size="small" class="ml-2">{{$t('applications.decline')}}</b-button>
              </div>
            </template>
          </b-table>
      </b-modal>

    <b-modal
        :title="$t('contact.title')"
        :visible.sync="dialogContactVisible"
        scrollable
        size="xl"
        hide-footer
        @hidden="dialogContactVisible = false">
          <b-tabs>
            <b-tab :title="$t('contact.message')">
              <b-form class="mt-3">
                <b-form-group :label="$t('contact.subject')" label-for="input-subject">
                  <b-form-input id="input-subject" v-model="contactForm.subject"></b-form-input>
                </b-form-group>
                <b-form-group :label="$t('contact.message')" label-for="input-message">
                  <wysiwyg v-model="contactForm.message"></wysiwyg>
                </b-form-group>
                <b-form-group :label="$t('contact.attachments')" label-for="input-attachments">
                  <b-form-file id="input-attachments" v-model="attachment"></b-form-file>
                </b-form-group>
                <div class="w-100 text-right">
                  <b-button variant="primary" :disabled="loading" @click="submitContactMembersForm()"><b-overlay :show="loading" rounded="sm">{{$t('contact.send')}}</b-overlay></b-button>
                </div>
              </b-form>
            </b-tab>
            <b-tab :title="$t('contact.preview')">
              <div class="w-100 text-center mt-5">
                <img src="/logo.png" style="width: 100px"/>
              </div>
              <div>
                <div v-html="contactForm.message"></div>
                <br>
                Met vriendelijke groeten,<br>
                Bestuur FPSA
              </div>
              <div style="background: #7D52C9; color: white; font-size:10px;" class="w-100 text-center mt-3">
                Dit bericht is automatisch verzonden, desondanks is antwoorden wel mogelijk. Federation of Purple Study Associations (FPSA), Rachelsmolen 1, 5612MA Eindhoven, KvK nr. 78356830
              </div>
            </b-tab>
          </b-tabs>
      </b-modal>
    </b-container>
  </b-tab>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import openApiContainer from '../../../openapi.container';
import HttpResponse from '../../../openapi/HttpResponse';
import { UserService } from '../../../openapi/api/user.service';
import { UserSummaryDTO } from '../../../openapi/model/userSummaryDTO';
import { User } from '../../../openapi/model/user';
import { Application } from '../../../openapi/model/application';
import moment from 'moment';
import XLSX from 'xlsx/xlsx';
import { ContactMembersDTO } from '@/openapi/model/contactMembersDTO';

@Component({})
export default class BoardAdmin extends Vue {
  // Util
  private userService: UserService = openApiContainer.get<UserService>('UserService');
  private fieldsUsers: any[] = [];
  private fieldsApplications: any[] = [];
  private moment = moment;
  private loading = false;

  // Dialog user
  private dialogUserVisible = false;
  private selectOptions: any[] = [];
  private selectOptionsNationality: any[] = [];
  private edit = false;
  private userForDialog: User = {
    id: 0,
    fullName: '',
    email: '',
    academy: '',
    establishment: '',
    kvk: 0,
    roleId: 2,
    boardTransfer: '',
    nationality: User.NationalityEnum.Dutch,
    isSleeping: false,
    recieveEmailUpdatesEvents: true,
    websiteUrl: 'https://',
  };
  private photo = new File([], '');

  // Dialog contact members
  private dialogContactVisible = false;
  private isIllegal = true;
  private contactForm: ContactMembersDTO = {
    subject: '',
    message: '',
    attachments: [],
  };
  private attachment?: Blob = new Blob();

  // Dialog applications
  private dialogApplicationsVisible = false;
  private applications: Application[] = [];

  // Excel export
  private readonly excelColumns: Array<{label: string, field: string}> = [
    { label: 'Naam', field: 'fullName' },
    { label: 'Email', field: 'email' },
    { label: 'Instituut', field: 'academy' },
    { label: 'Vestiging', field: 'establishment' },
    { label: 'KvK', field: 'kvk' },
    { label: 'Bestuurswissel in', field: 'boardTransfer' },
    { label: 'Lid sinds', field: 'memberSince' },
  ];

  private excelData: User[] = [];

  // Permissions
  private hasWritePermission: boolean = false;

  public mounted() {
    this.hasWritePermission = this.$store.getters.hasPermission('User:Write');

    this.fieldsUsers = [
      {
        key: 'fullName',
        label: this.$t('fullName').toString(),
        sortable: true,
      },
      {
        key: 'email',
        label: this.$t('email').toString(),
        sortable: true,
      },
      {
        key: 'boardTransfer',
        label: this.$t('boardTransfer').toString(),
        sortable: true,
      },
      {
        key: 'isSleeping',
        label: this.$t('isSleeping').toString(),
        sortable: false,
      },
      {
        key: 'role',
        label: this.$t('role').toString(),
        sortable: true,
      },
      {
        key: 'details',
        label: '',
        sortable: false,
      },
    ];

    this.fieldsApplications = [
      {
        key: 'name',
        label: this.$t('fullName').toString(),
      },
      {
        key: 'email',
        label: this.$t('email').toString(),
      },
      {
        key: 'academy',
        label: this.$t('academy').toString(),
      },
      {
        key: 'establishment',
        label: this.$t('establishment').toString(),
      },
      {
        key: 'kvk',
        label: this.$t('kvk').toString(),
      },
      {
        key: 'details',
        label: '',
      },
    ];

    this.selectOptions = [
      { value: 1, text: this.$t('roles.fpsa').toString() },
      { value: 2, text: this.$t('roles.association').toString() },
      { value: 3, text: this.$t('roles.fontys').toString()},
    ];

    this.selectOptionsNationality = [
      { value: 0, text: this.$t('nationalities.dutch').toString() },
      { value: 1, text: this.$t('nationalities.international').toString() },
    ];
  }

  private getUsers() {
    return new Promise((resolve) => {
      this.userService.userGetAll('response').subscribe((res: HttpResponse<UserSummaryDTO[]>) => {
        resolve(res.response);
      });
    });
  }

  private openAddDialog() {
    this.userForDialog = {
      id: 0,
      fullName: '',
      email: '',
      academy: '',
      establishment: '',
      kvk: 0,
      roleId: 2,
      boardTransfer: '',
      nationality: User.NationalityEnum.Dutch,
      isSleeping: false,
      recieveEmailUpdatesEvents: false,
      websiteUrl: 'https://',
    };

    this.attachment = new Blob();
    this.edit = false;
    this.dialogUserVisible = true;
  }

  private rowClicked(record: UserSummaryDTO, index: number) {
    this.openEditDialog(record.id);
  }

  private async openEditDialog(id: number) {
    this.userService.userGetOne((await id), 'response').subscribe((res: HttpResponse<User>) => {
      this.userForDialog = res.response;
      this.attachment = new Blob();
      this.edit = true;
      this.dialogUserVisible = true;
    });
  }

  private submitDialog() {
    this.loading = true;

    if (this.edit) {
      this.userService.userUpdate(
        this.userForDialog.id,
        this.userForDialog.fullName,
        this.userForDialog.email,
        this.userForDialog.academy,
        this.userForDialog.establishment,
        this.userForDialog.kvk,
        this.userForDialog.websiteUrl,
        this.userForDialog.boardTransfer,
        this.userForDialog.isSleeping,
        this.userForDialog.roleId,
        this.photo,
        'response',
      ).subscribe(this.handleSucces, this.handleError);

    } else {
      if (this.photo.size === 0) {
        this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});
        this.loading = false;
        return;
      }

      this.userService.userCreate(
        this.userForDialog.fullName,
        this.userForDialog.email,
        this.userForDialog.academy,
        this.userForDialog.establishment,
        this.userForDialog.kvk,
        this.userForDialog.websiteUrl,
        this.userForDialog.roleId,
        this.photo,
        this.userForDialog.boardTransfer,
        'response',
      ).subscribe(this.handleSucces, this.handleError);
    }
  }

  private deleteItem() {
    this.userService.userDelete(this.userForDialog.id, 'response').subscribe(this.handleSucces, this.handleError);
  }

  private handleError(err: HttpResponse) {
    this.loading = false;

    if (err.status === 400) {
      this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});

    } else if (err.status === 401 || err.status === 403) {
      this.$notify({group: 'foo', text: this.$t('error.no_permission').toString(), type: 'error'});

    } else {
      this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
    }
  }

  private handleSucces() {
    this.$notify({group: 'foo', text: this.$t('applications.successful').toString(), type: 'success'});
    (this.$refs.tableUsers as any).refresh();
    this.dialogUserVisible = false;
    this.loading = false;
  }

  private openApplicationDialog() {
    this.dialogApplicationsVisible = true;
  }

  private getApplications() {
    return new Promise((resolve) => {
      this.userService.applicationGetAll('response').subscribe((res: HttpResponse<Application[]>) => {
        resolve(res.response);
      });
    });
  }

  private async declineApplication(id: number) {
    this.userService.applicationDecline((await id), 'response').subscribe(this.handleApplicationSuccess, this.handleError);
  }

  private async acceptApplication(id: number) {
    this.userService.applicationAccept((await id), 'response').subscribe(this.handleApplicationSuccess, this.handleError);
  }

  private handleApplicationSuccess() {
    (this.$refs.tableApplication as any).refresh();
    this.$notify({group: 'foo', text: this.$t('applications.successful').toString(), type: 'success'});
  }

  private exportMember() {
    this.userService.userGetAllFull('response').subscribe((res: HttpResponse<User[]>) => {
      this.exportExcel(res.response);
    });
  }

  private openContactMembersDialog() {
    this.contactForm = { subject: '', message: '', attachments: [] };
    this.attachment = undefined;
    this.dialogContactVisible = true;
  }

  private handleFileUpload() {
    this.attachment = (this.$refs.file as any).files[0];
  }

  private submitContactMembersForm() {
    this.loading = true;
    this.userService.contactMembers(
      this.contactForm.subject,
      this.contactForm.message,
      this.attachment!,
      'response',
    ).subscribe(() => {
      this.$notify({group: 'foo', text: this.$t('contact.successful').toString(), type: 'success'});
      this.dialogContactVisible = false;
      this.loading = false;

    }, this.handleError);
  }

// Copied from https://github.com/t-chatoyan/vue-excel-xlsx/blob/master/VueExcelXlsx.vue
  private exportExcel(data: User[]) {
    const createXLSLFormatObj = [];
    const newXlsHeader: string[] = [];

    for (const value of this.excelColumns) {
        newXlsHeader.push(value.label);
    }

    createXLSLFormatObj.push(newXlsHeader);
    for (const value of data) {
        const innerRowData: string[] = [];
        for (const val of this.excelColumns) {
          innerRowData.push((value as any)[val.field]);
        }

        createXLSLFormatObj.push(innerRowData);
    }
    const filename = 'Ledenbestand_FPSA_' + moment().format('DD-MM-YYYYTHH:mm:ss') + '.xlsx';
    const wsName = 'Blad1';
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
    XLSX.utils.book_append_sheet(wb, ws, wsName);
    XLSX.writeFile(wb, filename);
  }
}
</script>

<style lang="scss" scoped>
.user-admin {
  &__actions {
    width: 100%;
    text-align: right;
    margin-bottom: 10px;
  }

  &__add{
    margin-right: 10px;
    margin-top: 10px;
  }
}
</style>

<i18n src="@/lang/views/admin/user.admin.json"></i18n>
