<template scoped>
  <b-container class="about-us">
    <b-row>
      <b-col>
          <b-card :title="$t('about_us.title')" class="mb-3 mt-3">
            <span>{{$t('about_us.content_intro')}}</span>
            <br><br>
            <span>{{$t('about_us.content_workshops')}}</span>
            <br><br>
            <span>{{$t('about_us.content_partner')}}</span>
            <br><br>
            <span>{{$t('about_us.content_role')}}</span>
            <br><br>
            <span>{{$t('about_us.content_more_info')}}</span> <a href="mailto:info@fpsa.nl">info@fpsa.nl</a>
          </b-card>
      </b-col>
    </b-row> 

    <b-row>
        <b-col>
            <b-card :title="$t('documents.title')" class="mb-3 mt-3">
                <a href="/statuten.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Statuten</a><br>
                <a href="/huishoudelijk-regelement.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Huishoudelijk regelement</a><br>
                <a href="/privacy.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Privacy</a><br>
                <a href="/gedragscode.pdf" target="_blank"><b-icon-paperclip></b-icon-paperclip>Gedragscode</a>
            </b-card>
        </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AboutUs extends Vue {
}
</script>

<style lang="scss" scoped>
</style>

<i18n src="@/lang/views/home.json"></i18n>
