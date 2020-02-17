<template scoped>
  <div class="home">
    <div class="home__welcome">
      <div class="home__welcome__info">
        <h2>{{ $t("welcome.umbrella_association") }}</h2>
        <h1>FPSA</h1>
        <h3>Federation of Purple Study Associations</h3>
      </div>
    </div>

    <el-main class="home__about-us">
      <h2 class="fpsa-header">{{$t('about_us.title')}}</h2>
      <span>{{$t('about_us.content_intro')}}</span>
      <br><br>
      <span>{{$t('about_us.content_workshops')}}</span>
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

  mounted() {
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
    background: linear-gradient(
        rgba(125, 82, 201, 0.6),
        rgba(125, 82, 201, 0.6)
      ),
      url("../assets/welcome.jpg");
    background-size: cover;
    background-position-x: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &__info {
      text-align: center;
      color: white;

      & h1 {
        font-size: 66px;
        line-height: 77px;
        margin-top: 40px;
        margin-bottom: 10px;
      }

      & h2 {
        font-weight: 600;
      }

      & h3 {
        font-weight: 400;
      }
    }
  }

  &__agenda {
    & .box-card {
      height: 95%;
      margin: 0px 60px;
      overflow-y: hidden;

      & div {
        width: 75%;
      }

      & .image-container {
        position: absolute;
        right: 75px;
        top: 60px;
        width: 20%;
        height: 70%;
        object-fit: cover;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .home {
    &__agenda {
      & .box-card {
        margin: 0px;

        & div {
          width: 100%;
        }

        & .image-container {
          display: none;
        }
      }
    }
  }
}
</style>

<i18n src="@/lang/views/home.json"></i18n>
