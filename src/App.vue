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

  background: #f9f9f9;
}

.content {
  margin-top: 60px;
  min-height: calc(100vh - 60px - 90px);
}

@media only screen and (max-width: 768px) {
  .content {
    min-height: calc(100vh - 120px - 90px);
  }
}
</style>
