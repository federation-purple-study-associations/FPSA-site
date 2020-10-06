<template scoped>
  <div class="agenda">
    <div class="page__heading dark-background">
      <b-container class="h-100">
        <b-row align-h="between" align-v="center" class="h-100">
          <b-col md>
            <h1>{{$t('agenda')}}</h1>
          </b-col>
          <b-col class="page__heading-text" md>
            {{$t('agenda_description')}} <br>
            <b-button variant="primary" @click="toggleTime" class="mt-2">{{inPast ? $t('seeComming') : $t('seePast')}}</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <b-card
            v-for="item in agendaItems" :key="item.id"
            :title="item.title"
            :img-src="url+ '/agenda/photo?id=' + item.id"
            img-right
            img-width="300px"
            @click="openDialog(item.id)"
            class="mb-3 mt-3 clickable">

              <b-card-text>
                <b>{{$t('location')}}</b> {{item.location}}<br>
                <b>{{$t('date')}}</b> {{moment(item.date).tz("UTC").format('DD-MM-YYYY HH:mm')}}<br><br>
                {{item.summary}}
              </b-card-text>
          </b-card>

          <b-pagination align="center" :total-rows="count" :per-page="pageSize" v-model="page" @input="changePage"></b-pagination>

          <b-modal id="agenda__modal" :title="agendaItem.title" hide-footer>
            <img :src="this.url + '/agenda/photo?id=' + agendaItem.id" style="width: 100%"/><br><br>
            <b>{{$t('location')}}</b> {{agendaItem.location}}<br>
            <b>{{$t('date')}}</b> {{moment(agendaItem.date).tz("UTC").format('DD-MM-YYYY HH:mm')}}<br><br>
            {{agendaItem.description}}
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AgendaSummaryDTO } from '@/openapi/model/agendaSummaryDTO';
import { AgendaAllDTO } from '@/openapi/model/agendaAllDTO';
import { AgendaService } from '@/openapi/api/agenda.service';
import openApiContainer from '@/openapi.container';
import moment from 'moment-timezone';
import HttpResponse from '../openapi/HttpResponse';
import { AgendaDetailsDTO } from '../openapi/model/agendaDetailsDTO';

@Component({})
export default class Agenda extends Vue {
  private agendaService = openApiContainer.get<AgendaService>('AgendaService');

  private moment = moment;
  private agendaItems: AgendaSummaryDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  private page = 1;
  private readonly pageSize = 25;
  private count = 0;
  private inPast: boolean = false;

  private agendaItem: AgendaDetailsDTO = {
    id: 0,
    location: '',
    date: '',
    title: '',
    description: '',
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

  private toggleTime() {
    this.inPast = !this.inPast;
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private getAgendaItems(language: string) {
    openApiContainer.get<AgendaService>('AgendaService').agendaGetAll(language, (this.page - 1) * this.pageSize, this.pageSize, '' + this.inPast, 'response')
    .subscribe((res: HttpResponse<AgendaAllDTO>) => {
      this.agendaItems = res.response.items;
      this.count = res.response.count;
    });
  }

  private changePage(index: number | null) {
    if (index) {
      this.getAgendaItems(this.$store.getters.currentLanguage);
    }
  }

  private openDialog(id: number) {
    this.agendaService.agendaGetOne(id, this.$store.getters.currentLanguage, 'response')
    .subscribe((res: HttpResponse<AgendaDetailsDTO>) => {
      this.agendaItem = res.response;
      this.$bvModal.show('agenda__modal');
    });
  }
}
</script>

<style lang="scss" scoped>
.agenda {
  .clickable {
    cursor: pointer;
  }
}
</style>

<i18n src="@/lang/views/agenda.json"></i18n>
