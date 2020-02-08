<template scoped>
  <div class="home">
    <div class="home__welcome">
      <div class="home__welcome__info">
        <h2>{{ $t("welcome.umbrella_association") }}</h2>
        <h1>FPSA</h1>
        <h3>Federation for Purple Study Associations</h3>
      </div>
    </div>

    <div>
      lol jk
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  &__welcome {
    height: calc(100vh - 60px);
    background: linear-gradient(
        rgba(125, 82, 201, 0.6),
        rgba(125, 82, 201, 0.6)
      ),
      url("../assets/welcome.jpg");
    background-size: cover;
    background-position-x: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &__info {
      text-align: center;
      color: white;

      & h1 {
        font-size: 66px;
        line-height: 77px;
        margin-top: 40px;
        margin-bottom: 10px;
      }

      & h2 {
        font-weight: 600;
      }

      & h3 {
        font-weight: 400;
      }
    }
  }
}
</style>

<i18n src="@/lang/views/home.json"></i18n>
