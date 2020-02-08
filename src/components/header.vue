<template scoped>
  <el-header class="header">
    <div>
      <router-link to="/">
        <img src="@/assets/logo.svg" />
      </router-link>
    </div>
    <el-menu mode="horizontal" class="header-navigation" :default-active="window.location.pathname" router>
      <el-menu-item index="/">{{$t('home')}}</el-menu-item>
      <el-menu-item index="/agenda">{{$t('agenda')}}</el-menu-item>
      <el-submenu index="">
        <template slot="title"><i class="el-icon-chat-dot-round"></i></template>
        <el-menu-item index="" v-on:click="switchLanguage('nl')">Nederlands</el-menu-item>
        <el-menu-item index="" v-on:click="switchLanguage('en')">English</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
  private window = window;

  private switchLanguage(lang: string): void {
    this.$store.dispatch('setLanguage', lang);
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #e6e6e6;

  & img {
    margin-left: 10px;
    margin-top: 5px;
    height: 50px;
  }

  & &-navigation {
    border-bottom: none;

    & a {
      text-decoration: none;
    }
  }
}
</style>

<i18n src="@/lang/components/header.json"></i18n>
