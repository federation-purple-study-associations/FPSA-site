<template scoped>
  <div class="board">
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Board extends Vue {
}
</script>

<style lang="scss" scoped>
.board {
}

@media only screen and (max-width: 768px) {
  .board {

  }
}
</style>

<i18n src="@/lang/views/board.json"></i18n>
