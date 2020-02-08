<template>
  <div id="app">
    <Header />
    <router-view class="content"/>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';

@Component({
  components: {
    Header,
    Footer
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
  min-height: calc(100vh - 60px - 60px);
}
</style>
