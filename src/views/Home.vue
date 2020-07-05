<template scoped>
  <b-container class="home">
    <b-row class="home__splash" align-v="center" align-h="center">
      <b-col lg="5" class="home__splash--column mb-5">
        <h2>{{$t('splash.umbrella_association')}} FPSA</h2>
        <h3>{{$t('splash.register')}}</h3>
        <router-link to="/contact#application"><b-button variant="primary" pill>{{$t('splash.click_here')}}</b-button></router-link>
      </b-col>
      <b-col lg="7" class="home__splash--column">
        <img src="/logo.png"/>
      </b-col>
    </b-row>

    <b-row class="home__welcome mb-5">
      <b-col>
        <h2>{{$t('welcome.title')}}</h2>
        <span>{{$t('welcome.text')}}</span><router-link to="/aboutus">{{$t('welcome.click_here')}}</router-link>
      </b-col>
    </b-row>

    <b-row class="home__agenda">
      <b-col><router-link to="/agenda">
        <h2>{{$t('agenda.title')}}</h2>
        <b-carousel control indictators>
          <b-carousel-slide
            v-for="item in agendaItems" :key="item.id"
            :caption="item.title"
            :img-src="url+ '/agenda/photo?id=' + item.id"
            :text="item.summary">
          </b-carousel-slide>
        </b-carousel>
      </router-link></b-col>
    </b-row> 
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AgendaSummaryDTO } from '@/openapi/model/agendaSummaryDTO';
import { AgendaService } from '@/openapi/api/agenda.service';
import openApiContainer from '@/openapi.container';
import moment from 'moment';
import HttpResponse from '../openapi/HttpResponse';
import { StatisticService } from '../openapi/api/statistic.service';
import { AgendaAllDTO } from '../openapi/model/agendaAllDTO';

@Component({})
export default class Home extends Vue {
  private moment = moment;
  private agendaItems: AgendaSummaryDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  constructor() {
    super();

    this.$store.subscribe((res: {type: string, payload: string}) => {
      if (res.type === 'SET_LANGUAGE') {
        this.getAgendaItems(res.payload);
      }
    });

    openApiContainer.get<StatisticService>('StatisticService').pageViewNew('response').subscribe();

    const error = new URLSearchParams(window.location.search.substring(1)).get('error');
    if (error === '404') {
      this.$notify({group: 'foo', text: this.$t('error.page_could_not_be_found').toString(), type: 'error'});
    }
  }

  public mounted() {
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private getAgendaItems(language: string) {
    openApiContainer.get<AgendaService>('AgendaService').agendaGetAll(language, 0, 10, 'response')
    .subscribe((res: HttpResponse<AgendaAllDTO>) => {
      this.agendaItems = res.response.items;
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__splash {
    background: white;
    height: calc(100vh - 60px);

    &--column {
      animation: fadein 3s;
      text-align: center;
    }

    img {
      width: 75%;
    }
  }

  @keyframes fadein {
    0% { opacity: 0; }
    100%   { opacity: 1; }
  }
}
</style>

<i18n src="@/lang/views/home.json"></i18n>
