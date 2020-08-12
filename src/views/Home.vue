<template scoped>
  <div>
    <div class="splash">
      <b-container class="h-100">
        <b-row align-v="center" align-h="center" class="h-100">
          <b-col lg="5" class="splash--column mb-5">
            <h1>{{$t('splash.umbrella_association')}} FPSA</h1>
            <div class="mb-3 text-left">{{$t('splash.welcome')}}</div>
            <div class="splash__button-wrapper">
              <router-link to="/"><b-button variant="primary" pill>{{$t('splash.register')}}</b-button></router-link>
              <router-link to="/"><b-button variant="primary" pill>{{$t('splash.read_more')}}</b-button></router-link>
            </div>
          </b-col>
          <b-col lg="7" class="splash--column">
            <img src="/SplashIcon.svg"/>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="more-information">
      <b-container>
        <b-row class="mb-3 pt-5">
          <b-col>
            <h1>{{$t('about_us.title')}}</h1>
            <span>{{$t('about_us.content_intro')}}</span>
            <br><br>
            <span>{{$t('about_us.content_workshops')}}</span>
            <br><br>
            <span>{{$t('about_us.content_partner')}}</span>
            <br><br>
            <span>{{$t('about_us.content_role')}}</span>
            <br><br>
            <span>{{$t('about_us.content_more_info')}}</span> <a href="mailto:info@fpsa.nl">info@fpsa.nl</a>
          </b-col>
        </b-row> 

        <b-row class="pb-5 mt-3">
          <b-col>
            <h1>{{$t('documents.title')}}</h1>
            <a href="/statuten.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Statuten</a><br>
            <a href="/huishoudelijk-regelement.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Huishoudelijk regelement</a><br>
            <a href="/privacy.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Privacy</a><br>
            <a href="/gedragscode.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Gedragscode</a>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="home">
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
  </div>
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
.splash {
  background: linear-gradient(138deg, $color-active 80%, $color-primary 100%);
  height: calc(100vh - 55px);

  &--column {
    animation: fadein 3s;
    text-align: center;
  }

  &__button-wrapper {
    display: flex;
    justify-content: space-evenly;
  }

  img {
    width: 100%;
  }
}

.more-information {
  background: #4D0073;
}

.home {
}

@keyframes fadein {
    0% { opacity: 0; }
    100%   { opacity: 1; }
  }
</style>

<i18n src="@/lang/views/home.json"></i18n>
