import envConfig from 'env-config';


export default ngInject(function ($translateProvider) {
  $translateProvider.useLoader('LiteralLanguageLoader', {
    /**
     * Absolute paths defined as literals to allow rev task
     * to find and substitute them
     */
    langs: {
      en: '/public/languages/en.json',
      id: '/public/languages/id.json'
    }
  }).useSanitizeValueStrategy('escaped')
    .useLocalStorage();

  if (!$translateProvider.use()) {
    $translateProvider.use(envConfig.defaultLang);
  }
});
