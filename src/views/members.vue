<template scoped>
    <div class="members">
    <div class="page__heading dark-background">
      <b-container class="h-100">
        <b-row align-h="between" align-v="center" class="h-100">
          <b-col md>
            <h1>{{$t('title')}}</h1>
          </b-col>
          <b-col class="page__heading-text" md>{{$t('description')}}</b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row v-for="row in rows" v-bind:key="row.id">
        <b-col class="mb-3 mt-3" v-for="item in row.columns" v-bind:key="item.id" md="4">
          <a :href="item.card.websiteUrl" target="_blank" v-if="item.active">
            <b-card class="members__card">
              <div class="members__card-img">
                  <img :src="url + '/user/photo?id=' + item.card.id" style="max-width: 100%; max-height: 100px;"/><br>
                </div>
              <b-card-text>
                  {{item.card.fullName}}
              </b-card-text>
            </b-card>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import openApiContainer from '@/openapi.container';
import { UserService } from '../openapi/api/user.service';
import { MemberDTO } from '../openapi/model/memberDTO';

@Component({})
export default class Members extends Vue {
  private rows: IGrid[] = [];
  private readonly url = process.env.VUE_APP_API_URL;

  constructor() {
    super();

    openApiContainer.get<UserService>('UserService').userGetAllMembers('response').subscribe((res) => {
      const nrOfCols = 3;
      const nrOfRows = Math.round(res.response.length / nrOfCols);

      for (let i = 0; i < nrOfRows; i++) {
        const row: IGrid = {id: i, columns: []};

        for (let j = 0; j < nrOfCols; j++) {
          if ((i * nrOfCols + j) >= res.response.length) {
            break;
          }

          row.columns.push({card: res.response[i * nrOfCols + j], active: true});
        }

        this.rows.push(row);
      }

      for (let i = this.rows[this.rows.length - 1].columns.length; i < 3; i++) {
        this.rows[this.rows.length - 1].columns.push({card: undefined, active: false});
      }
    });
  }
}

interface IGrid {
  id: number;
  columns: Array<{card?: MemberDTO, active: boolean}>;
}
</script>

<style lang="scss" scoped>
.members {
  &__card {
    cursor: pointer;
    transition: transform .2s;
    height: 180px;

    .card-text {
      position: absolute;
      bottom: 20px;
    }

    &:hover {
      transform: scale(1.2);
    }
  }

  &__card-img {
    width: 100%;
    max-height: 100px;
    text-align: center;
  }
}
</style>

<i18n src="@/lang/views/member.json"></i18n>
