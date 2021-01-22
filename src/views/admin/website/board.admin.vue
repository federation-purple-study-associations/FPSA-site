<template scoped>
  <b-tab :title="$t('board')">
    <b-container class="board-admin">
      <b-row>
        <b-col class="mb-3 mt-3 w-100 text-right">
          <b-button @click="openAddDialog" variant="outline-primary">{{$t('new_board')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card
            v-for="item in boardItems" :key="item.id"
            :title="item.title"
            :img-src="url+ '/board/photo?id=' + item.id + '&time=' + new Date().getTime()"
            img-right
            class="mb-3 mt-3"
            style="cursor: pointer;"
            @click="openDialog(item.id)">

              <b-card-text class="card-text__text-cap">{{item.text}}</b-card-text>

              <template v-slot:footer v-if="item.hasPolicyPlan">
                <a style="cursor: pointer; height: 100%" target="_blank" :href="url+ '/board/policy?id=' + item.id">
                  <b-icon-paperclip></b-icon-paperclip><br>
                  {{$t('policy_plan')}}
                </a>
              </template>
          </b-card>

          <b-pagination align="center" :total-rows="total" :per-page="pageSize" v-model="page" @input="changePage"></b-pagination>
        </b-col>
      </b-row>

      <b-modal
        :title="edit ? $t('dialog.title_edit') : $t('dialog.title_add')"
        :visible.sync="dialogVisible"
        no-close-on-backdrop
        scrollable
        hide-header-close>
          <b-form>
            <b-form-group :label="$t('dialog.title')">
              <b-form-input :placeholder="$t('dialog.dutch')" v-model="boardForDialog.titleNL"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input :placeholder="$t('dialog.english')" v-model="boardForDialog.titleEN"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('dialog.text')">
              <b-form-textarea :placeholder="$t('dialog.dutch')" v-model="boardForDialog.textNL"></b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-form-textarea :placeholder="$t('dialog.english')" v-model="boardForDialog.textEN"></b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('dialog.image')">
              <b-form-file :placeholder="edit ? $t('dialog.image_note') : ''" accept="image/*" v-model="boardImage"></b-form-file>
            </b-form-group>
            <b-form-group :label="$t('policy_plan')">
              <b-form-file :placeholder="$t('dialog.policy_plan_note')" v-model="policyPlan"></b-form-file>
            </b-form-group>
          </b-form>
          <template v-slot:modal-footer>
            <div class="w-100 text-right">
              <b-button variant="danger" v-if="edit" @click="deleteItem" class="mr-2">{{$t('dialog.delete')}}</b-button>
              <b-button variant="dark" @click="dialogVisible = false" class="mr-2">{{$t('dialog.cancel')}}</b-button>
              <b-button variant="secondary" @click="submitDialog" :disabled="loading"><b-overlay :show="loading" rounded="sm">{{$t('dialog.confirm')}}</b-overlay></b-button>
            </div>
          </template>
      </b-modal>
    </b-container>
  </b-tab>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { BoardInfoDTO } from '../../../openapi/model/boardInfoDTO';
import openApiContainer from '../../../openapi.container';
import { BoardService } from '../../../openapi/api/board.service';
import HttpResponse from '../../../openapi/HttpResponse';
import { Board } from '../../../openapi/model/board';
import { BoardInfoTotalDTO } from '../../../openapi/model/boardInfoTotalDTO';

@Component({})
export default class BoardAdmin extends Vue {
  // Util
  private boardService: BoardService = openApiContainer.get<BoardService>('BoardService');
  private boardItems: BoardInfoDTO[] = [];
  private readonly url: string | undefined = process.env.VUE_APP_API_URL;

  // Pagination
  private page = 1;
  private readonly pageSize = 25;
  private total = 0;

  // Dialog
  private dialogVisible = false;
  private edit = false;
  private loading = false;
  private boardForDialog: Board = {
    titleNL: '',
    titleEN: '',
    textNL: '',
    textEN: '',
    id: 0,
  };
  private boardImage?: Blob = new Blob();
  private policyPlan?: Blob = new Blob();

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
    this.boardService.boardGetAll(lang, (this.page - 1) * this.pageSize, this.pageSize, 'response').subscribe((res: HttpResponse<BoardInfoTotalDTO>) => {
      this.boardItems = res.response.boards;
      this.total = res.response.total;
    });
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
        this.boardImage = undefined;
        this.policyPlan = undefined;
        this.dialogVisible = true;
        this.edit = true;
    });
  }

  private submitDialog() {
    this.loading = true;

    if (this.edit) {
        this.boardService.boardpdate(
            this.boardForDialog.id,
            this.boardForDialog.titleNL,
            this.boardForDialog.titleEN,
            this.boardForDialog.textNL,
            this.boardForDialog.textEN,
            this.boardImage,
            this.policyPlan,
            'response',
        ).subscribe(this.handleSucces, this.handleError);

    } else {
        this.boardService.boardCreate(
            this.boardForDialog.titleNL,
            this.boardForDialog.titleEN,
            this.boardForDialog.textNL,
            this.boardForDialog.textEN,
            this.boardImage!,
            this.policyPlan,
            'response',
        ).subscribe(this.handleSucces, this.handleError);
    }
  }

  private handleError(err: HttpResponse) {
    this.loading = false;

    if (err.status === 400) {
      this.$notify({group: 'foo', text: this.$t('error.form_not_filled_in_correctly').toString(), type: 'error'});

    } else {
      this.$notify({group: 'foo', text: this.$t('error.unknown').toString(), type: 'error'});
    }
  }

  private handleSucces() {
    this.$notify({group: 'foo', text: this.$t('action_success').toString(), type: 'success'});
    this.getBoards(this.$store.getters.currentLanguage);
    this.dialogVisible = false;
    this.loading = false;
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
