<template>
  <div id="app">
    <HomeHeader v-if="window.location.pathname.split('/')[1] !== 'admin'"/>
    <AdminHeader v-if="window.location.pathname.split('/')[1] === 'admin'"/>
    <router-view class="content"/>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeHeader from '@/components/header/home.header.vue';
import AdminHeader from '@/components/header/admin.header.vue';
import Footer from '@/components/footer.vue';

@Component({
  components: {
    HomeHeader,
    AdminHeader,
    Footer,
  },
})
export default class App extends Vue {
  private window = window;
}
</script>

<style lang="scss">
body {
  font-family: "Helvetica Neue";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  min-height: calc(100vh - 56px - 78px);
}

@media only screen and (max-width: 768px) {
  .content {
    min-height: calc(100vh - 150px - 56px);
  }
}
</style>
