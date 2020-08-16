<template scoped>
  <div class="boad">
     <div class="page__heading dark-background">
      <b-container class="h-100">
        <b-row align-h="between" align-v="center" class="h-100">
          <b-col md>
            <h1>{{$t('board')}}</h1>
          </b-col>
          <b-col class="page__heading-text" md>{{$t('board_description')}}</b-col>
        </b-row>
      </b-container>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <b-card
            v-for="item in boardItems" :key="item.id"
            :title="item.title"
            :img-src="url+ '/board/photo?id=' + item.id"
            img-right
            class="mb-3 mt-3">

              <b-card-text>{{item.text}}</b-card-text>

              <template v-slot:footer v-if="item.hasPolicyPlan">
                <a style="cursor: pointer; height: 100%" target="_blank" :href="url+ '/board/policy?id=' + item.id">
                  <b-icon-paperclip></b-icon-paperclip><br>
                  {{$t('policy_plan')}}
                </a>
              </template>
          </b-card>

          <b-pagination align="center" :total-rows="count" :per-page="pageSize" v-model="page" @input="changePage"></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { BoardInfoDTO } from '../openapi/model/boardInfoDTO';
import openApiContainer from '../openapi.container';
import { BoardService } from '../openapi/api/board.service';
import HttpResponse from '../openapi/HttpResponse';
import { BoardInfoTotalDTO } from '../openapi/model/boardInfoTotalDTO';

@Component({})
export default class Board extends Vue {
  private boardItems: BoardInfoDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  private page = 1;
  private readonly pageSize = 25;
  private count = 0;

  constructor() {
    super();

    this.$store.subscribe((res: {type: string, payload: string}) => {
      if (res.type === 'SET_LANGUAGE') {
        this.getBoards(res.payload);
      }
    });
  }

  public mounted() {
    this.getBoards(this.$store.getters.currentLanguage);
  }

  private changePage(index: number | null) {
    if (index) {
      this.getBoards(this.$store.getters.currentLanguage);
    }
  }

  private getBoards(lang: string) {
    openApiContainer.get<BoardService>('BoardService').boardGetAll(lang, (this.page - 1) * this.pageSize, this.pageSize, 'response').subscribe((res: HttpResponse<BoardInfoTotalDTO>) => {
      this.boardItems = res.response.boards;
      this.count = res.response.total;
    });
  }
}
</script>

<i18n src="@/lang/views/board.json"></i18n>
