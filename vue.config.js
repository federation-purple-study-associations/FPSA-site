module.exports = {
  pluginOptions: {
    i18n: {
      locale: "nl",
      fallbackLocale: "en",
      localeDir: "lang",
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/variables.scss";',
      },
    },
  }
};
