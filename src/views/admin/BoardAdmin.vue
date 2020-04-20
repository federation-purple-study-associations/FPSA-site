<template scoped>
  <div class="board-admin">
    <div class="board-admin__new-board">
      <el-button type="primary" class="board-admin__add" @click="openAddDialog">{{$t('new_board')}}</el-button>
    </div>

    <el-card class="box-card" v-for="item in boardItems" :key="item.title" @click.native="openDialog(item.id)">
      <div slot="header">
        <h2 class="fpsa-header">{{item.title}}</h2>
      </div>
      
      <div class="box-card__text">{{item.text}}</div>
      <img class="image-container" :src="url+ '/board/photo?id=' + item.id"/>
    </el-card>

    <el-pagination class="board-admin__pagination" background layout="prev, pager, next" :total="count" :page-size="pageSize" @current-change="changePage"></el-pagination>

    <el-dialog :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')" :visible.sync="dialogVisible">
      <el-form ref="form" :model="boardForDialog" label-width="120px">
        <el-form-item :label="$t('dialog.title')">
          <el-input :placeholder="$t('dialog.dutch')" v-model="boardForDialog.titleNL"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :placeholder="$t('dialog.english')" v-model="boardForDialog.titleEN"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dialog.text')">
          <el-input :placeholder="$t('dialog.dutch')" v-model="boardForDialog.textNL" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :placeholder="$t('dialog.english')" v-model="boardForDialog.textEN" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dialog.image')">
          <input type="file" ref="file" v-on:change="handleFileUpload()"/><br>
          {{edit ? $t('dialog.image_note') : ''}}
        </el-form-item>
      </el-form>
      <el-button-group slot="footer" class="dialog-footer">
        <el-button type="danger" v-if="edit" @click="deleteItem">{{$t('dialog.delete')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('dialog.cancel')}}</el-button>
        <el-button type="primary" @click="submitDialog">{{$t('dialog.confirm')}}</el-button>
      </el-button-group>
    </el-dialog>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { BoardInfoDTO } from '../../openapi/model/boardInfoDTO';
import openApiContainer from '../../openapi.container';
import { BoardService } from '../../openapi/api/board.service';
import HttpResponse from '../../openapi/HttpResponse';
import { Board } from '../../openapi/model/board';

@Component({})
export default class BoardAdmin extends Vue {
  // Util
  private boardService: BoardService = openApiContainer.get<BoardService>('BoardService');
  private boardItems: BoardInfoDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  // Pagination
  private skip = 0;
  private readonly pageSize = 25;
  private count = 0;

  // Dialog
  private dialogVisible = false;
  private edit = false;
  private image?: Blob = undefined;
  private boardForDialog: Board = {
    titleNL: '',
    titleEN: '',
    textNL: '',
    textEN: '',
    id: 0,
  };

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
    this.boardService.boardGetAll(lang, this.skip, this.pageSize, 'response').subscribe((res: HttpResponse<BoardInfoDTO[]>) => {
      this.boardItems = res.response;
    });
  }

  private handleFileUpload() {
    this.image = (this.$refs.file as any).files[0];
  }

  private openAddDialog() {
    this.boardForDialog = {
        titleNL: '',
        titleEN: '',
        textNL: '',
        textEN: '',
        id: 0,
    };

    this.edit = false;
    this.dialogVisible = true;
  }

  private openDialog(id: number) {
    this.boardService.boardGetOriginalOne(id, 'response').subscribe((res: HttpResponse<Board>) => {
        this.boardForDialog = res.response;
        this.image = undefined;
        this.dialogVisible = true;
        this.edit = true;
    });
  }

  private submitDialog() {
    if (this.edit) {
        this.boardService.boardpdate(
            this.boardForDialog.id,
            this.boardForDialog.titleNL,
            this.boardForDialog.titleEN,
            this.boardForDialog.textNL,
            this.boardForDialog.textEN,
            this.image,
            'response',
        ).subscribe(this.handleSucces, this.handleError);

    } else {
        this.boardService.boardCreate(
            this.boardForDialog.titleNL,
            this.boardForDialog.titleEN,
            this.boardForDialog.textNL,
            this.boardForDialog.textEN,
            this.image!,
            'response',
        ).subscribe(this.handleSucces, this.handleError);
    }
  }

  private handleError(err: HttpResponse) {
    if (err.status === 400) {
      this.$message.error(this.$t('error.form_not_filled_in_correctly').toString());

    } else {
      this.$message.error(this.$t('error.unknown').toString());
    }
  }

  private handleSucces() {
    this.getBoards(this.$store.getters.currentLanguage);
    this.dialogVisible = false;
  }

  private deleteItem() {
      this.boardService.boardDelete(this.boardForDialog.id, 'response').subscribe(this.handleSucces);
  }
}
</script>

<style lang="scss" scoped>
.board-admin {
  &__pagination {
    text-align: center
  }

  &__add{
    margin-top: 10px;
  }

  & .box-card {
    transition: transform .5s;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
  }

  &__new-board {
    text-align: right;
    margin-top: 10px;
    padding-right: 30px;
  }
}
</style>

<i18n src="@/lang/views/admin/boardAdmin.json"></i18n>
