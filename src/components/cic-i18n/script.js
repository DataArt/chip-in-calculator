Polymer({
    is: "cic-i18n",

    properties: {
        knownLocales : {
            type: Array,
            value: ['en', 'ru']
        }
    },

    loadLocales: function(){
        clientLocale = (window.navigator.userLanguage || window.navigator.language).slice(0,2);
        isKnownLocale = this.knownLocales.indexOf(clientLocale) > -1;
        I18nMsg.lang = isKnownLocale ? clientLocale : 'en';
        I18nMsg.url = 'locales';
    }
});
