<template scoped>
  <div class="home">
    <div class="home__welcome">
      <div class="home__welcome__info">
        <h2>{{ $t("welcome.umbrella_association") }}</h2>
        <h1>FPSA</h1>
        <h3>Federation for Purple Study Associations</h3>
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
            <div><b>{{$t('agenda.date')}}</b> {{moment(item.dateTime).format('DD-MM-YYYY hh:mm')}}</div>
            <br>
            <div>{{$store.getters.currentLanguage === 'nl' ? item.contentNL : item.contentEN}}</div>
            <img class="image-container" :src="item.imgUrl"/>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component({})
export default class Home extends Vue {
  private moment = moment;

  private agendaItems: {
    title: string,
    imgUrl: string,
    location: string,
    dateTime: Date,
    contentNL: string,
    contentEN: string
  }[] = [
    {
      title: 'Informatieavond FPSA (Tilburg)',
      imgUrl: '/img/stock-presentation.fe729c53.jpg',
      location: 'Tilburg',
      dateTime: new Date(2020, 3, 4, 19, 0, 0),
      contentNL: 'Afgelopen december hebben jullie bericht gehad over het oprichten van een koepel, die als overkoepelende vereniging namens studieverenigingen optreedt tegen Fontys en derden. Wij willen jullie mededelen dat de koepel genaamd ‘FPSA’ per 1 september 2020 actief zal zijn. Om jullie tijdig te informeren wat FPSA voor jullie vereniging gaat betekenen, willen wij jullie uitnodigen voor een informatiebijeenkomst. Na afloop van de bijeenkomst vindt er een borrel plaats.',
      contentEN: 'Last December you were informed about the establishment of an umbrella organization, which acts as an umbrella association on behalf of study associations against Fontys and third parties. We want to inform you that the umbrella called "FPSA" will be active from 1 September 2020. To inform you in time what FPSA will mean for your association, we would like to invite you for an information meeting. After the meeting a drink will take place.'
    },
    {
      title: 'Informatieavond FPSA (Eindhoven)',
      imgUrl: '/img/stock-presentation.fe729c53.jpg',
      location: 'Rachelsmolen 1, Eindhoven',
      dateTime: new Date(2020, 3, 5, 18, 0, 0),
      contentNL: 'Afgelopen december hebben jullie bericht gehad over het oprichten van een koepel, die als overkoepelende vereniging namens studieverenigingen optreedt tegen Fontys en derden. Wij willen jullie mededelen dat de koepel genaamd ‘FPSA’ per 1 september 2020 actief zal zijn. Om jullie tijdig te informeren wat FPSA voor jullie vereniging gaat betekenen, willen wij jullie uitnodigen voor een informatiebijeenkomst. Na afloop van de bijeenkomst vindt er een borrel plaats.',
      contentEN: 'Last December you were informed about the establishment of an umbrella organization, which acts as an umbrella association on behalf of study associations against Fontys and third parties. We want to inform you that the umbrella called "FPSA" will be active from 1 September 2020. To inform you in time what FPSA will mean for your association, we would like to invite you for an information meeting. After the meeting a drink will take place.'
    }
  ];
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
      overflow-y: scroll;

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
