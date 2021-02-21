<template scoped>
  <div>
    <div class="splash dark-background">
      <b-container class="h-100">
        <b-row align-v="center" align-h="center" class="h-100">
          <b-col lg="5" class="splash--column mb-5">
            <h1>{{$t('splash.umbrella_association')}} FPSA</h1>
            <div class="mb-3 text-justify">{{$t('splash.welcome')}}</div>
            <div class="splash__button-wrapper">
              <router-link to="application"><b-button variant="primary" pill>{{$t('splash.register')}}</b-button></router-link>
              <b-button variant="primary" pill @click="scrollMeTo('about-us')">{{$t('splash.read_more')}}</b-button>
            </div>
          </b-col>
          <b-col lg="7" class="splash--column">
            <img class="ml-3" src="/SplashIcon.svg"/>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="more-information dark-background">
      <b-container>
        <b-row class="mb-3 pt-5">
          <b-col>
            <h1 ref="about-us">{{$t('about_us.title')}}</h1>
            <div class="text-justify mb-3">{{$t('about_us.content_intro')}}</div>
            <div class="text-justify mb-3">{{$t('about_us.content_workshops')}}</div>
            <div class="text-justify mb-3">{{$t('about_us.content_partner')}}</div>
            <div class="text-justify mb-3">{{$t('about_us.content_role')}}</div>
          </b-col>
        </b-row> 

        <b-row class="pb-5 mt-3">
          <b-col>
            <h1>{{$t('documents.title')}}</h1>
            <a href="/statuten.pdf" target="_blank"><b-icon-paperclip/>{{$t('documents.by_law')}}</a><br>
            <a href="/huishoudelijk-regelement.pdf" target="_blank"><b-icon-paperclip/>{{$t('documents.house_rules')}}</a><br>
            <a href="/privacy.pdf" target="_blank"><b-icon-paperclip/>{{$t('documents.privacy')}}</a><br>
            <a href="/gedragscode.pdf" target="_blank"><b-icon-paperclip/>{{$t('documents.code_of_conduct')}}</a>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container>
      <b-row class="agenda">
        <b-col>
          <router-link to="/agenda" class="agenda__link--no-underline">
            <h1 class="title--purple">{{$t('agenda.title')}}</h1>
            <div v-if="agendaItems[0]" class="text-center">
              <img :src="url+ '/agenda/photo?id=' + agendaItems[0].id" class="agenda__image"/>
              <h2 class="title--purple">{{agendaItems[0].title}}</h2>
              <p>{{agendaItems[0].description}}</p>
            </div>
          </router-link>
        </b-col>
      </b-row> 
    </b-container>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AgendaSummaryDTO } from '@/openapi/model/agendaSummaryDTO';
import { AgendaService } from '@/openapi/api/agenda.service';
import openApiContainer from '@/openapi.container';
import HttpResponse from '../openapi/HttpResponse';
import { StatisticService } from '../openapi/api/statistic.service';
import { AgendaAllDTO } from '../openapi/model/agendaAllDTO';

@Component({})
export default class Home extends Vue {
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
  }

  public scrollMeTo(refName: string) {
    (this.$refs[refName] as any).scrollIntoView({ behavior: 'smooth' });
  }

  public mounted() {
    this.getAgendaItems(this.$store.getters.currentLanguage);
  }

  private getAgendaItems(language: string) {
    openApiContainer.get<AgendaService>('AgendaService').agendaGetAll(language, 0, 1, undefined, 'response')
    .subscribe((res: HttpResponse<AgendaAllDTO>) => {
      this.agendaItems = res.response.items;
    });
  }
}
</script>

<style lang="scss" scoped>
.splash {
  // background: linear-gradient(138deg, $color-active 80%, $color-primary 100%);
  background: $color-active;
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
  background: $color-active;
}

.contact {
  &--privacy {
    color: $color-primary;
  }
}

.agenda {
  &__title {
    &--purple {
      color: $color-active;
    }
  }

  &__image {
    height: 300px;
  }

  &__link {
    &--no-underline {
      text-decoration: none;
    }
  }
}

@keyframes fadein {
    0% { opacity: 0; }
    100%   { opacity: 1; }
  }
</style>

<i18n src="@/lang/views/home.json"></i18n>
