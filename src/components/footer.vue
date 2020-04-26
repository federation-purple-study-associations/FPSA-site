<template scoped>
  <el-footer class="footer">
    <div class="footer__copyright">
        {{$t('information.copyright')}}<br>
        <a href="privacy">Privacy</a>
    </div>
    <div>
        <span>Rachelsmolen 1</span>
        <br>
        <span>5612 MA Eindhoven</span>
    </div>
    <div>
        <span><a href="mailto:info@fpsa.nl">info@fpsa.nl</a></span>
        <br>
        <span>kvk:</span>
    </div>
  </el-footer>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
    background: #7D52C9;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    text-align: center;

    a {
        color: white;
    }
}

@media only screen and (max-width: 768px) {
    .footer {
        height: 120px !important;
        display: block;
    }

    #app .content {
        min-height: calc(100vh - 60px - 150px);
    }
}
</style>

<i18n src="@/lang/components/footer.json"></i18n>
