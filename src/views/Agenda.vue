<template scoped>
  <div class="agenda">
    <div class="spaceing"></div>

    <el-card class="box-card" v-for="item in agendaItems" :key="item.title" @click.native="openDialog(item.id)">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
      </div>
      <div><b>{{$t('location')}}</b> {{item.location}}</div>
      <div><b>{{$t('date')}}</b> {{moment(item.date).format('DD-MM-YYYY HH:mm')}}</div>
      <br>
      <div>{{item.summary}}</div>
      <img class="image-container" :src="url+ '/agenda/photo?id=' + item.id"/>
    </el-card>

    <el-pagination class="agenda__pagination" background layout="prev, pager, next" :total="count" :page-size="pageSize" @current-change="changePage"></el-pagination>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AgendaSummaryDTO } from '@/openapi/model/agendaSummaryDTO';
import { AgendaAllDTO } from '@/openapi/model/agendaAllDTO';
import { AgendaService } from '@/openapi/api/agenda.service';
import openApiContainer from '@/openapi.container';
import moment from 'moment';
import HttpResponse from '../openapi/HttpResponse';
import { AgendaDetailsDTO } from '../openapi/model/agendaDetailsDTO';

@Component({})
export default class Agenda extends Vue {
  private agendaService = openApiContainer.get<AgendaService>('AgendaService');

  private moment = moment;
  private agendaItems: AgendaSummaryDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  private skip = 0;
  private readonly pageSize = 25;
  private count = 0;

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

  private getAgendaItems(language: string) {
    openApiContainer.get<AgendaService>('AgendaService').agendaGetAll(language, this.skip, this.pageSize, 'response')
    .subscribe((res: HttpResponse<AgendaAllDTO>) => {
      this.agendaItems = res.response.items;
      this.count = res.response.count;
    });
  }

  private changePage(page: number) {
    this.skip = (page - 1) * this.pageSize;
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private openDialog(id: number) {
    this.agendaService.agendaGetOne(id, this.$store.getters.currentLanguage, 'response')
    .subscribe((res: HttpResponse<AgendaDetailsDTO>) => {
      const text =  '<img class="image-popup" src="' + this.url + '/agenda/photo?id=' + res.response.id + '"/>' +
                    '<b>' + this.$t('location').toString() + '</b> ' + res.response.location + '<br>' +
                    '<b>' + this.$t('date').toString() + '</b> ' + moment(res.response.date).format('DD-MM-YYYY HH:mm') + '<br><br>' +
                    res.response.description;

      this.$alert(text, res.response.title, {
        confirmButtonText: 'OK',
        dangerouslyUseHTMLString: true,
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.agenda {
  & .spaceing {
    height: 20px;
  }

  &__pagination {
    text-align: center
  }

  & .box-card {
    transition: transform .5s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>

<i18n src="@/lang/views/agenda.json"></i18n>
