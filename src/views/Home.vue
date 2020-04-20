<template scoped>
  <div class="home">
    <div class="home__welcome">
      <div class="home__welcome--column">
        <h2 class="fpsa-header home__welcome--header">{{$t('welcome.umbrella_association')}} FPSA</h2>
        <h3 class="home__welcome--text">Meld je nu aan!</h3>
        <el-button type="primary" round><router-link to="/contact#application">Klik hier</router-link></el-button>
      </div>
      <img src="/logo.png" class="home__welcome--column"/>
    </div>

    <el-main class="home__about-us">
      <h2 class="fpsa-header">{{$t('about_us.title')}}</h2>
      <span>{{$t('about_us.content_intro')}}</span>
      <br><br>
      <span>{{$t('about_us.content_workshops')}}</span>
      <br><br>
      <span>{{$t('about_us.content_partner')}}</span>
      <br><br>
      <span>{{$t('about_us.content_role')}}</span>
      <br><br>
      <span>{{$t('about_us.content_more_info')}}</span> <a href="mailto:info@fpsa.nl">info@fpsa.nl</a>
    </el-main>

    <el-main class="home__agenda">
      <h2 class="fpsa-header">{{$t('agenda.title')}}</h2>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in agendaItems" :key="item.title">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.title}}</span>
            </div>
            <div><b>{{$t('agenda.location')}}</b> {{item.location}}</div>
            <div><b>{{$t('agenda.date')}}</b> {{moment(item.date).format('DD-MM-YYYY HH:mm')}}</div>
            <br>
            <div>{{item.summary}}</div>
            <img class="image-container" :src="url+ '/agenda/photo?id=' + item.id"/>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-main>
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
  &__welcome {
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;

    &--header {
      font-size: 40px;
    }

    &--text {
      color: rgb(80, 80, 80);
    }

    &--column {
      width: 40%;
      animation: fadein 3s;
    }

    & a {
      text-decoration: none;
      color: white;
    }
  }

  &__agenda {
    & .box-card {
      height: 90%;
    }
  }

  @keyframes fadein {
    0% { opacity: 0; }
    100%   { opacity: 1; }
  }
}
</style>

<i18n src="@/lang/views/home.json"></i18n>
