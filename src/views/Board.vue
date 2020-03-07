<template scoped>
  <div class="board">
    <div class="board__spaceing"></div>

    <el-card class="box-card" v-for="item in boardItems" :key="item.title">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
      </div>
      
      <div class="box-card__text">{{item.text}}</div>
      <img class="image-container" :src="url+ '/board/photo?id=' + item.id"/>
    </el-card>

    <el-pagination class="board__pagination" background layout="prev, pager, next" :total="count" :page-size="pageSize" @current-change="changePage"></el-pagination>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { BoardInfoDTO } from '../openapi/model/boardInfoDTO';
import openApiContainer from '../openapi.container';
import { BoardService } from '../openapi/api/board.service';
import HttpResponse from '../openapi/HttpResponse';

@Component({})
export default class Board extends Vue {
  private boardItems: BoardInfoDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  private skip = 0;
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

  private changePage(page: number) {
    this.skip = (page - 1) * this.pageSize;
    this.getBoards(this.$store.getters.currentLanguage);
  }

  private getBoards(lang: string) {
    openApiContainer.get<BoardService>('BoardService').boardGetAll(lang, this.skip, this.pageSize, 'response').subscribe((res: HttpResponse<BoardInfoDTO[]>) => {
      this.boardItems = res.response;
    });
  }
}
</script>

<style lang="scss" scoped>
.board {
  &__spaceing {
    height: 20px;
  }

  &__pagination {
    text-align: center
  }
}

@media only screen and (max-width: 768px) {
  .board {

  }
}
</style>

<i18n src="@/lang/views/board.json"></i18n>
