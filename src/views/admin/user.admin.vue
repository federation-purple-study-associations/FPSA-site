<template scoped>
  <div class="user-admin">
    <div class="user-admin__actions">
      <el-button class="user-admin__application" @click="openApplicationDialog">{{$t('applications.title')}}</el-button>
      <el-button class="user-admin__add" @click="openAddDialog">{{$t('add')}}</el-button>
    </div>
    <el-table :data="users" :stripe="true">
      <el-table-column prop="fullName" :label="$t('fullName')" sortable></el-table-column>
      <el-table-column prop="email" :label="$t('email')" sortable></el-table-column>
      <el-table-column prop="role" :label="$t('role')" sortable></el-table-column>
      <el-table-column fixed="right" label="" width="80">
        <template slot-scope="scope">
          <el-button @click="openEditDialog(scope.row.id)" type="text" size="small" style="float: right">{{$t('edit')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')" :visible.sync="dialogUserVisible">
      <el-form ref="form" :model="userForDialog" label-width="120px">
        <el-form-item :label="$t('fullName')">
          <el-input v-model="userForDialog.fullName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('email')">
          <el-input v-model="userForDialog.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('academy')">
          <el-input v-model="userForDialog.academy"></el-input>
        </el-form-item>
        <el-form-item :label="$t('establishment')">
          <el-input v-model="userForDialog.establishment"></el-input>
        </el-form-item>
        <el-form-item :label="$t('kvk')">
          <el-input v-model="userForDialog.kvk"></el-input>
        </el-form-item>
        <el-form-item :label="$t('role')">
          <el-select v-model="userForDialog.roleId">
            <el-option :value="1" :label="$t('roles.fpsa')">{{$t('roles.fpsa')}}</el-option>
            <el-option :value="2" :label="$t('roles.association')">{{$t('roles.association')}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button-group slot="footer" class="dialog-footer">
        <el-button type="danger" v-if="edit" @click="deleteItem">{{$t('dialog.delete')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('dialog.cancel')}}</el-button>
        <el-button type="primary" @click="submitDialog">{{$t('dialog.confirm')}}</el-button>
      </el-button-group>
    </el-dialog>

    <el-dialog :title="$t('applications.title')" :visible.sync="dialogApplicationsVisible">
      <el-table :data="applications" :stripe="true">
        <el-table-column prop="name" :label="$t('fullName')" sortable></el-table-column>
        <el-table-column prop="email" :label="$t('email')" sortable></el-table-column>
        <el-table-column fixed="right" label="" width="100">
          <template slot-scope="scope">
            <el-button type="danger" @click="declineApplication(scope.row.id)" size="small" style="float: right; width: 90px">{{$t('applications.decline')}}</el-button>
            <el-button type="success" @click="acceptApplication(scope.row.id)" size="small" style="float: right; width: 90px">{{$t('applications.accept')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
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

@Component({})
export default class BoardAdmin extends Vue {
  // Util
  private userService: UserService = openApiContainer.get<UserService>('UserService');
  private users: UserSummaryDTO[] = [];

  // Dialog
  private dialogUserVisible = false;
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

  public mounted() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.userGetAll('response').subscribe((res: HttpResponse<UserSummaryDTO[]>) => {
      this.users = res.response;
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

  private openEditDialog(id: number) {
    this.userService.userGetOne(id, 'response').subscribe((res: HttpResponse<User>) => {
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
      this.$message.error(this.$t('error.form_not_filled_in_correctly').toString());

    } else {
      this.$message.error(this.$t('error.unknown').toString());
    }
  }

  private handleSucces() {
    this.getUsers();
    this.dialogUserVisible = false;
  }

  private openApplicationDialog() {
    this.userService.applicationGetAll('response').subscribe((res: HttpResponse<Application[]>) => {
      this.applications = res.response;
      this.dialogApplicationsVisible = true;
    });
  }

  private declineApplication(id: number) {
    this.userService.applicationDecline(id, 'response').subscribe(this.handleApplicationSuccess, this.handleError);
  }

  private acceptApplication(id: number) {
    this.userService.applicationAccept(id, 'response').subscribe(this.handleApplicationSuccess, this.handleError);
  }

  private handleApplicationSuccess() {
    this.openApplicationDialog();
    this.$message.success(this.$t('applications.successful').toString());
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
