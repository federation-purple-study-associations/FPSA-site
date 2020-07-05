<template>
  <div id="app">
    <div v-if="window.location.pathname.split('/')[1] !== 'error'">
      <HomeHeader v-if="window.location.pathname.split('/')[1] !== 'admin'"/>
      <AdminHeader v-if="window.location.pathname.split('/')[1] === 'admin'"/>
      <router-view class="content"/>
      <Footer />
      <notifications group="foo" />
    </div>
    <div v-else class="error">
      <router-view/>
    </div>
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

#app .content {
  min-height: calc(100vh - 56px - 78px);
}

#app>.error {
  height: 100%;
  width: 100%;
  position: absolute;
}

@media only screen and (max-width: 768px) {
  #app .content {
    min-height: calc(100vh - 150px - 56px);
  }
}
</style>
