<template scoped>
  <div class="admin">
    <div class="admin__spaceing"></div>
    <div class="welcome-admin">
      <div class="welcome-admin__message">
        <h2 class="fpsa-header">{{$t('message.welcome').toString() + me.fullName}}</h2>
        <div>
          {{$t('message.last_login')}}
          {{
          me.lastLogin ? moment(me.lastLogin).format($t('message.last_login_format').toString()) : $t('message.last_login_never')
          }}
        </div>
        <el-button class="welcome-admin__logout" type="primary" @click="logout">{{$t('logout')}}</el-button>
      </div>
      <apexchart class="welcome-admin__page-views-chart" width="100%" type="line" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import openApiContainer from '../../openapi.container';
import { StatisticService } from '../../openapi/api/statistic.service';
import { User } from '../../openapi/model/user';
import HttpResponse from '../../openapi/HttpResponse';
import { PageView } from '../../openapi/model/pageView';
import { UserService } from '../../openapi/api/user.service';
import moment from 'moment';

@Component({})
export default class WelcomeAdmin extends Vue {
  private moment = moment;
  private me: User = {
    id: 0,
    fullName: '',
    email: '',
    lastLogin: '',
  };
  private chartOptions = {
    chart: {
      id: 'vuechart-example',
      type: 'line',
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
    },
  };
  private series: Array<{name: string, data: Array<{x: number, y: number}> }> = [];

  mounted() {
    openApiContainer.get<StatisticService>('StatisticService').pageViewGetAll('response').subscribe((res: HttpResponse<PageView[]>) => {
      const data = res.response.map((view) => { return {y: view.count, x: new Date(view.date).getTime() }; });
      this.series = [ { name: this.$t('page_views.title').toString(), data } ];
    });

    openApiContainer.get<UserService>('UserService').me('response').subscribe((res: HttpResponse<User>) => {
      this.me = res.response;
    });
    
    this.chartOptions = {
      ...this.chartOptions,
      ...{
        title: {
          text: this.$t('page_views.title').toString(),
          align: 'left',
        },
      }
    }
  }

  private async logout() {
    await this.$store.dispatch('logout');
    window.location.href = '/';
  }
}
</script>

<style lang="scss" scoped>
.admin {
  &__spaceing {
    height: 20px;
  }

  & .welcome-admin {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;

    &__message {
      margin-bottom: 30px;
    }

    &__page-views-chart {
      width: 50%;
      height: 50%;
    }

    &__logout {
      margin-top: 10px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .admin {
    & .welcome-admin {
      flex-direction: column;

      &__page-views-chart {
        width: 100%;
      }
    }
  }
}
</style>

<i18n src="@/lang/views/admin/welcomeAdmin.json"></i18n>
