<template scoped>
  <div class="privacy">
        <div class="spaceing"></div>
        <h2 class="fpsa-header">{{$t('title')}}</h2>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('information_collection.title')}}</h3>
        <div>{{$t('information_collection.collect')}}</div>
        <ul>
            <li>{{$t('information_collection.collection.name')}}</li>
            <li>{{$t('information_collection.collection.location')}}</li>
            <li>{{$t('information_collection.collection.academy')}}</li>
            <li>{{$t('information_collection.collection.email')}}</li>
            <li>{{$t('information_collection.collection.kvk')}}</li>
        </ul>
        <div>{{$t('information_collection.collect_cpf')}}</div>
        <ul>
            <li>{{$t('information_collection.collection.names_board')}}</li>
            <li>{{$t('information_collection.collection.size')}}</li>
            <li>{{$t('information_collection.collection.goals')}}</li>
            <li>{{$t('information_collection.collection.other')}} <a href="https://fontys.nl/web/file?uuid=bb4a3909-ea4c-4b0d-98d4-97dfe9574104&owner=458011ba-35e2-4ec8-bae3-ef97620e85c6&contentid=138555" target="_blank">{{$t('information_collection.collection.application')}}</a></li>
        </ul>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('goal_information_collection.title')}}</h3>
        <div>{{$t('goal_information_collection.text')}}</div>
        <ul>
            <li>{{$t('goal_information_collection.newsletter')}}</li>
            <li>{{$t('goal_information_collection.board_grant')}}</li>
            <li>{{$t('goal_information_collection.contact')}}</li>
            <li>{{$t('goal_information_collection.coorparation')}}</li>
        </ul>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('keep_data.title')}}</h3>
        <div>{{$t('keep_data.text')}}</div>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('third_parties.title')}}</h3>
        <div>{{$t('third_parties.text')}}</div>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('cookies.title')}}</h3>
        <div>{{$t('cookies.text')}}</div>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('data.title')}}</h3>
        <div>{{$t('data.part1')}}<a href="mailto:info@fpsa.nl">info@fpsa.nl</a>{{$t('data.part2')}}<a href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons">https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons</a></div>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('security.title')}}</h3>
        <div>{{$t('security.text')}}<a href="mailto:info@fpsa.nl">info@fpsa.nl</a></div>

        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('imagery.title')}}</h3>
        <div>{{$t('imagery.part1')}}<a href="mailto:info@fpsa.nl">info@fpsa.nl</a>{{$t('imagery.part2')}}</div>


        <div class="spaceing"></div>
        <h3 class="fpsa-header">{{$t('modification.title')}}</h3>
        <div>{{$t('modification.text')}}</div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Privacy extends Vue {
}
</script>

<style lang="scss" scoped>
.privacy {
    padding: 0px 20px;
}
</style>

<i18n src="@/lang/views/privacy.json"></i18n>
