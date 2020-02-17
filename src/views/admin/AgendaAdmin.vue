<template scoped>
  <div class="agenda-admin">
    <div class="spaceing"></div>

    <el-card class="box-card" v-for="item in agendaItems" :key="item.title" @click.native="openEditDialog(item.id)">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
      </div>
      <div><b>{{$t('location')}}</b> {{item.location}}</div>
      <div><b>{{$t('date')}}</b> {{moment(item.date).format('DD-MM-YYYY HH:mm')}}</div>
      <br>
      <div>{{item.summary}}</div>
      <img class="image-container" :src="url+ '/agenda/photo?id=' + item.id"/>
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
        <el-form-item>
          <el-upload action="#" list-type="picture-card" :auto-upload="false" :show-file-list="false" :on-change="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button-group slot="footer" class="dialog-footer">
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
import { UpdateAgendaDTO } from '../../openapi/model/updateAgendaDTO';
import { AgendaItem } from '../../openapi/model/agendaItem';

@Component({})
export default class AgendaAdmin extends Vue {
  // Services
  private agendaService = openApiContainer.get<AgendaService>('AgendaService');

  // Util
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
  private images: Array<{name: string, url: string}> = []
  private image: Blob = new Blob();
  private agendaItemForDialog: AgendaItem = {
    id: 0,
    location: '',
    date: '',
    titleNL: '',
    titleEN: '',
    summaryNL: '',
    summaryEN: '',
    descriptionNL: '',
    descriptionEN: ''
  }

  constructor() {
    super();

    this.$store.subscribe((res: {type: string, payload: string}) => {
      if (res.type === 'SET_LANGUAGE') {
        this.getAgendaItems(res.payload);
      }
    });
  }

  mounted() {
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private changePage(page: number) {
    this.skip = (page - 1) * this.pageSize;
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private getAgendaItems(language: string) {
    this.agendaService.agendaGetAll(language, 0, 10, 'response')
    .subscribe((res: HttpResponse<AgendaAllDTO>) => {
      this.agendaItems = res.response.items;
      this.count = res.response.count;
    });
  }

  private openEditDialog(id: number) {
    this.agendaService.agendaGetOriginalOne(id, 'response').subscribe((res: HttpResponse<AgendaItem>) => {
      this.agendaItemForDialog = res.response;
      this.dialogVisible = true;
      this.edit = true;
      this.images = [
        {name: 'picture.jpg', url: this.url + 'agenda/photo?' + res.response.id}
      ]
    });
  }

  private handleAvatarSuccess(file: File) {
    this.image = file;
  }

  private submitDialog() {
    if (this.edit) {
      const model: UpdateAgendaDTO = {
        location: this.agendaItemForDialog.location,
        date: this.agendaItemForDialog.date,
        titleNL: this.agendaItemForDialog.titleNL,
        titleEN: this.agendaItemForDialog.titleEN,
        summaryNL: this.agendaItemForDialog.summaryNL,
        summaryEN: this.agendaItemForDialog.summaryEN,
        descriptionNL: this.agendaItemForDialog.descriptionNL,
        descriptionEN: this.agendaItemForDialog.descriptionEN,
        image: this.image
      };
      console.log(model);
      this.agendaService.agendaUpdate(this.agendaItemForDialog.id, model, 'response').subscribe(() => {
        this.dialogVisible = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.agenda-admin {
  & .spaceing {
    height: 20px;
  }

  &__pagination {
    text-align: center
  }

  & .box-card {
      margin: 20px 60px;
      position: relative;
      transition: transform .5s;
      overflow-y: hidden;
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

@media only screen and (max-width: 768px) {
  .agenda-admin {
    & .box-card {
      margin: 20px 0px;

      & div {
        width: 100%;
      }

      & .image-container {
        display: none;
      }
    }
  }
}
</style>

<i18n src="@/lang/views/admin/agendaAdmin.json"></i18n>
