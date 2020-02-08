<template scoped>
  <el-footer class="footer">
    <div class="footer__copyright">
        {{$t('information.copyright')}}
    </div>
    <div class="footer__information">
        <div>
            <span>Rachelsmolen 1</span>
            <span><a href="mailto:info@fpsa.nl">info@fpsa.nl</a></span>
        </div>
        <div>
            <span>5612 MA Eindhoven</span>
            <span>Kvk: ???</span>
        </div>
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

    &__information {
        width: 300px;

        div {
            display: flex;
            justify-content: space-between;

            a {
                color: white;
            }
        }
    }
}
</style>

<i18n src="@/lang/components/footer.json"></i18n>
