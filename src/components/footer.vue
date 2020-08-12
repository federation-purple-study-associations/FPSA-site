<template scoped>
  <footer class="footer">
    <div class="footer__copyright">
        Copyright {{new Date().getFullYear()}} {{$t('information.copyright')}}<br>
        <a href="privacy.pdf" target="_blank">Privacy</a>
    </div>
    <div>
        <span><a href="mailto:info@fpsa.nl">info@fpsa.nl</a></span>
        <br>
        <span>kvk: 78356830</span>
    </div>
  </footer>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
    position: absolute;
    left: 0px;
    right: 0px;
    padding: 0 20px;
    background: $color-active;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    text-align: center;

    a {
        color: white;
        text-decoration: underline;
    }
}

@media only screen and (max-width: 768px) {
    footer {
        height: 120px !important;
        display: block;
    }

    #app .content {
        min-height: calc(100vh - 60px - 150px);
    }
}
</style>

<i18n src="@/lang/components/footer.json"></i18n>
