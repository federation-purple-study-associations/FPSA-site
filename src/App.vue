<template>
  <div id="app">
    <div v-if="window.location.pathname.split('/')[1] !== 'error'">
      <HomeHeader v-if="window.location.pathname.split('/')[1] !== 'admin'"/>
      <AdminHeader v-if="window.location.pathname.split('/')[1] === 'admin'"/>
      <router-view class="content"/>
      <Footer />
      <notifications group="foo" />

      <div class="social-media" v-if="window.location.pathname.split('/')[1] !== 'admin'">
        <a href="https://www.facebook.com/FederationOfPurpleStudyAssociations/" target="_blank" class="social-media__button"><b-icon-facebook font-scale="3" class="rounded-circle"></b-icon-facebook></a>
        <a href="https://www.linkedin.com/company/federation-of-purple-study-associations/" target="_blank" class="social-media__button ml-3"><b-icon-linkedin font-scale="3"></b-icon-linkedin></a>
      </div>
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
  min-height: calc(100vh - 100px - 78px);
}

#app>.error {
  height: 100%;
  width: 100%;
  position: absolute;
}

.social-media {
  position: fixed;
  right: 30px;
  bottom: 55px;
  display: flex; 
  flex-direction: row;
  z-index: 999;

  &__button {
    color: rgba(0, 0, 0, 0.6);

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
}

@media only screen and (max-width: 768px) {
  #app .content {
    min-height: calc(100vh - 150px - 56px);
  }
}
</style>
