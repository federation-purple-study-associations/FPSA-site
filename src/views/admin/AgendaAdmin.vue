<template scoped>
  <div class="agenda-admin">
    <div class="agenda-admin__new-agenda-item">
      <el-button type="primary" class="agenda-admin__add" @click="openAddDialog">{{$t('new_item')}}</el-button>
    </div>

    <el-card class="box-card" v-for="item in agendaItems" :key="item.title" @click.native="openEditDialog(item.id)">
      <div slot="header">
        <h2 class="fpsa-header">{{item.title}}</h2>
      </div>

      <div><b>{{$t('location')}}</b> {{item.location}}</div>
      <div><b>{{$t('date')}}</b> {{moment(item.date).format('DD-MM-YYYY HH:mm')}}</div>
      <br>
      <div>{{item.summary}}</div>
      <img class="image-container" :src="url+ '/agenda/photo?id=' + item.id + 't=' + imageTime"/>
    </el-card>

    <el-pagination class="agenda-admin__pagination" background layout="prev, pager, next" :total="count" :page-size="pageSize" @current-change="changePage"></el-pagination>

    <el-dialog :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')" :visible.sync="dialogVisible">
      <el-form ref="form" :model="agendaItemForDialog" label-width="120px">
        <el-form-item :label="$t('dialog.location')">
          <el-input v-model="agendaItemForDialog.location"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dialog.date')">
          <el-date-picker v-model="agendaItemForDialog.date" type="datetime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('dialog.title')">
          <el-input :placeholder="$t('dialog.dutch')" v-model="agendaItemForDialog.titleNL"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :placeholder="$t('dialog.english')" v-model="agendaItemForDialog.titleEN"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dialog.summary')">
          <el-input :placeholder="$t('dialog.dutch')" v-model="agendaItemForDialog.summaryNL" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :placeholder="$t('dialog.english')" v-model="agendaItemForDialog.summaryEN" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dialog.description')">
          <el-input :placeholder="$t('dialog.dutch')" v-model="agendaItemForDialog.descriptionNL" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :placeholder="$t('dialog.english')" v-model="agendaItemForDialog.descriptionEN" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dialog.draft')">
          <el-checkbox v-model="agendaItemForDialog.isDraft"></el-checkbox>
        </el-form-item>
        <el-form-item :label="$t('dialog.image')">
          <input type="file" ref="file" v-on:change="handleFileUpload()"/><br>
          {{edit ? $t('dialog.image_note') : ''}}
        </el-form-item>
      </el-form>
      <el-button-group slot="footer" class="dialog-footer">
        <el-button type="danger" v-if="edit" @click="deleteItem">{{$t('dialog.delete')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('dialog.cancel')}}</el-button>
        <el-button type="primary" @click="submitDialog()">{{$t('dialog.confirm')}}</el-button>
      </el-button-group>
    </el-dialog>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AgendaSummaryDTO } from '@/openapi/model/agendaSummaryDTO';
import { AgendaService } from '@/openapi/api/agenda.service';
import openApiContainer from '@/openapi.container';
import moment from 'moment';
import HttpResponse from '../../openapi/HttpResponse';
import { AgendaAllDTO } from '../../openapi/model/agendaAllDTO';
import { AgendaItem } from '../../openapi/model/agendaItem';

@Component({})
export default class AgendaAdmin extends Vue {
  // Services
  private agendaService = openApiContainer.get<AgendaService>('AgendaService');

  // Util
  private imageTime = new Date().getTime();
  private moment = moment;
  private agendaItems: AgendaSummaryDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  // Pagination
  private skip = 0;
  private readonly pageSize = 25;
  private count = 0;

  // Dialog
  private dialogVisible = false;
  private edit = false;
  private image?: Blob = undefined;
  private agendaItemForDialog: AgendaItem = {
    id: 0,
    location: '',
    date: '',
    titleNL: '',
    titleEN: '',
    summaryNL: '',
    summaryEN: '',
    descriptionNL: '',
    descriptionEN: '',
    isDraft: true,
  };

  constructor() {
    super();

    this.$store.subscribe((res: {type: string, payload: string}) => {
      if (res.type === 'SET_LANGUAGE') {
        this.getAgendaItems(res.payload);
      }
    });
  }

  public mounted() {
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private changePage(page: number) {
    this.skip = (page - 1) * this.pageSize;
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private getAgendaItems(language: string) {
    this.agendaService.agendaGetAll(language, this.skip, this.pageSize, 'response')
    .subscribe((res: HttpResponse<AgendaAllDTO>) => {
      this.agendaItems = res.response.items;
      this.count = res.response.count;
      this.imageTime = new Date().getTime();
    });
  }

  private openEditDialog(id: number) {
    this.agendaService.agendaGetOriginalOne(id, 'response').subscribe((res: HttpResponse<AgendaItem>) => {
      this.agendaItemForDialog = res.response;
      this.image = undefined;
      this.dialogVisible = true;
      this.edit = true;
    });
  }

  private openAddDialog() {
    this.agendaItemForDialog = {
      id: 0,
      location: '',
      date: '',
      titleNL: '',
      titleEN: '',
      summaryNL: '',
      summaryEN: '',
      descriptionNL: '',
      descriptionEN: '',
      isDraft: true,
    };

    this.edit = false;
    this.dialogVisible = true;
  }

  private handleFileUpload() {
    this.image = (this.$refs.file as any).files[0];
  }

  private submitDialog() {
    if (this.edit) {
      this.agendaService.agendaUpdate(
        this.agendaItemForDialog.id,
        this.agendaItemForDialog.location,
        this.agendaItemForDialog.date,
        this.agendaItemForDialog.titleNL,
        this.agendaItemForDialog.titleEN,
        this.agendaItemForDialog.summaryNL,
        this.agendaItemForDialog.summaryEN,
        this.agendaItemForDialog.descriptionNL,
        this.agendaItemForDialog.descriptionEN,
        this.agendaItemForDialog.isDraft ? 'true' : 'false',
        this.image,
        'response')
      .subscribe(this.handleSucces, this.handleError);

    } else {
      this.agendaService.agendaCreateNew(
        this.agendaItemForDialog.location,
        this.agendaItemForDialog.date,
        this.agendaItemForDialog.titleNL,
        this.agendaItemForDialog.titleEN,
        this.agendaItemForDialog.summaryNL,
        this.agendaItemForDialog.summaryEN,
        this.agendaItemForDialog.descriptionNL,
        this.agendaItemForDialog.descriptionEN,
        this.agendaItemForDialog.isDraft ? 'true' : 'false',
        this.image!,
        'response')
      .subscribe(this.handleSucces, this.handleError);
    }
  }

  private handleError(err: HttpResponse) {
    if (err.status === 400) {
      this.$message.error(this.$t('error.form_not_filled_in_correctly').toString());

    } else {
      this.$message.error(this.$t('error.unknown').toString());
    }
  }

  private handleSucces() {
    this.getAgendaItems(this.$store.getters.currentLanguage);
    this.dialogVisible = false;
  }

  private deleteItem() {
      this.agendaService.agendaDelete(this.agendaItemForDialog.id, 'response').subscribe(this.handleSucces);
  }
}
</script>

<style lang="scss" scoped>
.agenda-admin {
  &__pagination {
    text-align: center
  }

  &__add{
    margin-top: 10px;
  }

  &__new-agenda-item {
    text-align: right;
    margin-top: 10px;
    padding-right: 30px;
  }

  & .box-card {
      transition: transform .5s;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }

      & div {
        width: 75%;
      }

      & .image-container {
        position: absolute;
        right: 10px;
        top: 60px;
        width: 20%;
        height: 65%;
        object-fit: cover;
      }
    }
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
</style>

<i18n src="@/lang/views/admin/agendaAdmin.json"></i18n>
