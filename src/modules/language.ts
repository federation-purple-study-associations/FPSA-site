import VueI18n from 'vue-i18n';
import Vue from 'vue';

const storageConst = 'language';

export const supportedLanguages = ['nl', 'en'];

if (!localStorage.getItem(storageConst)) {
  localStorage.setItem(storageConst, 'nl');
}

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: localStorage.getItem(storageConst) || 'nl',
  fallbackLocale: 'en',
});

export default {
  namespaced: false,
  state: {
    language: localStorage.getItem(storageConst),
  },
  getters: {
    currentLanguage: (state: {language: string | null}) => {
      return state.language;
    },
  },
  mutations: {
    SET_LANGUAGE(state: any, lang: string) {
      localStorage.setItem(storageConst, lang);
      state.language = lang;
      i18n.locale = lang;
    },
  },
  actions: {
    setLanguage({ commit }: any, language: string) {
      commit('SET_LANGUAGE', language);
    },
  },
};
