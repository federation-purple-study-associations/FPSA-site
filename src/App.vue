<template>
  <div id="app">
    <Header />
    <router-view class="content"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/header.vue';

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.content {
  margin-top: 60px;
}
</style>
