<template scoped>
  <b-tab :title="$t('agenda')">
    <b-container class="agenda-admin">
      <b-row>
        <b-col class="mb-3 mt-3 w-100 text-right">
          <b-button @click="toggleTime" variant="outline-primary" class="mr-2">{{inPast ? $t('seeComming') : $t('seePast')}}</b-button>
          <b-button @click="openAddDialog" variant="outline-primary">{{$t('new_item')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card
            v-for="item in agendaItems" :key="item.id"
            :title="item.title"
            :img-src="url+ '/agenda/photo?id=' + item.id"
            img-right
            img-width="300px"
            @click="openEditDialog(item.id)"
            class="mb-3 mt-3 clickable">

              <b-card-text>
                <b>{{$t('location')}}</b> {{item.location}}<br>
                <b>{{$t('date')}}</b> {{moment(item.date).tz("UTC").format('DD-MM-YYYY HH:mm')}}<br><br>
                {{item.summary}}
              </b-card-text>
          </b-card>

          <b-pagination align="center" :total-rows="count" :per-page="pageSize" v-model="page" @input="changePage"></b-pagination>
        </b-col>
      </b-row>

      <b-modal
        :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')"
        :visible.sync="dialogVisible"
        no-close-on-backdrop
        scrollable
        hide-header-close>
          <b-form>
            <b-form-group :label="$t('dialog.location')">
              <b-form-input v-model="agendaItemForDialog.location"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('dialog.date')">
              <b-form-datepicker v-model="agendaItemForDialog.date"></b-form-datepicker>
              <b-form-timepicker v-model="time"></b-form-timepicker>
            </b-form-group>
            <b-form-group :label="$t('dialog.title')">
              <b-form-input :placeholder="$t('dialog.dutch')" v-model="agendaItemForDialog.titleNL"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input :placeholder="$t('dialog.english')" v-model="agendaItemForDialog.titleEN"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('dialog.summary')">
              <b-form-textarea :placeholder="$t('dialog.dutch')" v-model="agendaItemForDialog.summaryNL"></b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-form-textarea :placeholder="$t('dialog.english')" v-model="agendaItemForDialog.summaryEN"></b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('dialog.description')">
              <b-form-textarea :placeholder="$t('dialog.dutch')" v-model="agendaItemForDialog.descriptionNL"></b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-form-textarea :placeholder="$t('dialog.english')" v-model="agendaItemForDialog.descriptionEN"></b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('dialog.draft')">
              <b-form-checkbox v-model="agendaItemForDialog.isDraft"></b-form-checkbox>
            </b-form-group>
            <b-form-group :label="$t('dialog.image')">
              <b-form-file :placeholder="edit ? $t('dialog.image_note') : ''" v-model="image"></b-form-file>
            </b-form-group>
          </b-form>
          <template v-slot:modal-footer>
            <div class="w-100 text-right">
              <b-button variant="danger" v-if="edit" @click="deleteItem" class="mr-2">{{$t('dialog.delete')}}</b-button>
              <b-button variant="dark" @click="dialogVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
              <b-button variant="secondary" @click="submitDialog">{{$t('dialog.confirm')}}</b-button>
            </div>
          </template>
      </b-modal>
    </b-container>
  </b-tab>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AgendaSummaryDTO } from '@/openapi/model/agendaSummaryDTO';
import { AgendaService } from '@/openapi/api/agenda.service';
import openApiContainer from '@/openapi.container';
import moment from 'moment';
import HttpResponse from '../../../openapi/HttpResponse';
import { AgendaAllDTO } from '../../../openapi/model/agendaAllDTO';
import { AgendaItem } from '../../../openapi/model/agendaItem';
import datePicker from 'vue-bootstrap-datetimepicker';

@Component({
  components: {
      datePicker,
    },
})
export default class AgendaAdmin extends Vue {
  // Services
  private agendaService = openApiContainer.get<AgendaService>('AgendaService');

  // Util
  private imageTime = new Date().getTime();
  private moment = moment;
  private agendaItems: AgendaSummaryDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  // Pagination
  private page = 1;
  private readonly pageSize = 25;
  private count = 0;
  private inPast = false;

  // Dialog
  private dialogVisible = false;
  private edit = false;
  private image?: Blob = new Blob();
  private time: string = '';
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

  private changePage(index: number | null) {
    if (index) {
      this.getAgendaItems(this.$store.getters.currentLanguage);
    }
  }

  private toggleTime() {
    this.inPast = !this.inPast;
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private getAgendaItems(language: string) {
    this.agendaService.agendaGetAll(language, (this.page - 1) * this.pageSize, this.pageSize, '' + this.inPast, 'response')
    .subscribe((res: HttpResponse<AgendaAllDTO>) => {
      this.agendaItems = res.response.items;
      this.count = res.response.count;
      this.imageTime = new Date().getTime();
    });
  }

  private openEditDialog(id: number) {
    this.agendaService.agendaGetOriginalOne(id, 'response').subscribe((res: HttpResponse<AgendaItem>) => {
      this.agendaItemForDialog = res.response;
      this.time = moment(res.response.date).format('HH:mm:ss');
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
        moment(this.agendaItemForDialog.date).format('YYYY-MM-DD') + 'T' + this.time,
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
        moment(this.agendaItemForDialog.date).format('YYYY-MM-DD') + 'T' + this.time,
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
      this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});

    } else {
      this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
    }
  }

  private handleSucces() {
    this.$notify({group: 'foo', text: this.$t('action_success').toString(), type: 'success'});
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

<i18n src="@/lang/views/agenda.json"></i18n>
