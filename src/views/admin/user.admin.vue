<template scoped>
  <b-container class="user-admin">
    <b-row>
      <b-col class="mb-3 mt-3 w-100 text-right">
        <b-button @click="exportMember" variant="outline-primary" class="mr-2">{{$t('export')}}</b-button>
        <b-button @click="openApplicationDialog" variant="outline-primary" class="mr-2">{{$t('applications.title')}}</b-button>
        <b-button @click="openAddDialog" variant="outline-primary">{{$t('add')}}</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover sticky-header ref="tableUsers" :items="getUsers" :fields="fieldsUsers">
          <template v-slot:cell(details)="row">
            <b-button @click="openEditDialog(row.item.id)" variant="link" style="float: right">{{$t('edit')}}</b-button>
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
            <b-button variant="outline-primary" @click="dialogUserVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
            <b-button variant="primary" @click="submitDialog">{{$t('dialog.confirm')}}</b-button>
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
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import openApiContainer from '../../openapi.container';
import HttpResponse from '../../openapi/HttpResponse';
import { UserService } from '../../openapi/api/user.service';
import { UserSummaryDTO } from '../../openapi/model/userSummaryDTO';
import { User } from '../../openapi/model/user';
import { UserUpdateDTO } from '../../openapi/model/userUpdateDTO';
import { UserNewDTO } from '../../openapi/model/userNewDTO';
import { Application } from '../../openapi/model/application';
import moment from 'moment';
import XLSX from 'xlsx/xlsx';

@Component({})
export default class BoardAdmin extends Vue {
  // Util
  private userService: UserService = openApiContainer.get<UserService>('UserService');
  private fieldsUsers: any[] = [];
  private fieldsApplications: any[] = [];
  private moment = moment;

  // Dialog
  private dialogUserVisible = false;
  private selectOptions: any[] = [];
  private edit = false;
  private userForDialog: User = {
    id: 0,
    fullName: '',
    email: '',
    academy: '',
    establishment: '',
    kvk: 0,
    roleId: 2,
    recieveEmailUpdatesEvents: true,
  };

  // Applications
  private dialogApplicationsVisible = false;
  private applications: Application[] = [];

  // Excel export
  private readonly excelColumns: Array<{label: string, field: string}> = [
    { label: 'Naam', field: 'fullName' },
    { label: 'Email', field: 'email' },
    { label: 'Instituut', field: 'academy' },
    { label: 'Vestiging', field: 'establishment' },
    { label: 'KvK', field: 'kvk' },
    { label: 'Lid sinds', field: 'memberSince' },
  ];

  private excelData: User[] = [];

  public mounted() {
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
      recieveEmailUpdatesEvents: false,
    };

    this.edit = false;
    this.dialogUserVisible = true;
  }

  private async openEditDialog(id: number) {
    this.userService.userGetOne((await id), 'response').subscribe((res: HttpResponse<User>) => {
      this.userForDialog = res.response;
      this.edit = true;
      this.dialogUserVisible = true;
    });
  }

  private submitDialog() {
    if (this.edit) {
      this.userService.userUpdate(
        this.userForDialog.id,
        this.userForDialog as UserUpdateDTO,
      ).subscribe(this.handleSucces, this.handleError);

    } else {
      this.userService.userCreate(
        this.userForDialog as UserNewDTO,
      ).subscribe(this.handleSucces, this.handleError);
    }
  }

  private deleteItem() {
    this.userService.userDelete(this.userForDialog.id, 'response').subscribe(this.handleSucces, this.handleError);
  }

  private handleError(err: HttpResponse) {
    if (err.status === 400) {
      this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});

    } else {
      this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
    }
  }

  private handleSucces() {
    this.$notify({group: 'foo', text: this.$t('applications.successful').toString(), type: 'success'});
    (this.$refs.tableUsers as any).refresh();
    this.dialogUserVisible = false;
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
