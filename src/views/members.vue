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
      <b-row class="mb-3 mt-3" v-for="row in rows" v-bind:key="row.id">
        <b-col v-for="item in row.columns" v-bind:key="item.id" sm="3">
          <a :href="item.websiteUrl" target="_blank">
            <b-card class="members__card">
              <b-card-text>
                  <div style="max-width: 100%; max-height: 100px; text-align: center">
                    <img :src="url + '/user/photo?id=' + item.id" style="max-width: 100%; max-height: 100px;"/><br>
                  </div>
                  {{item.fullName}}
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
      const nrOfRows = Math.floor(res.response.length / nrOfCols);

      for (let i = 0; i < nrOfRows; i++) {
        const row: IGrid = {id: i, columns: []};

        for (let j = 0; j < nrOfCols; j++) {
          if ((i * nrOfCols + j) >= res.response.length) {
            break;
          }

          row.columns.push(res.response[i * nrOfCols + j]);
        }

        this.rows.push(row);
      }
    });
  }
}

interface IGrid {
  id: number;
  columns: MemberDTO[];
}
</script>

<style lang="scss" scoped>
.members {
  &__card {
    cursor: pointer;
    transition: transform .2s;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>

<i18n src="@/lang/views/member.json"></i18n>
