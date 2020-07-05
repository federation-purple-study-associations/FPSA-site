<template scoped>
  <div class="center">
      <img src="/404.png"/>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Error404 extends Vue { }
</script>

<style lang="scss" scoped>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
