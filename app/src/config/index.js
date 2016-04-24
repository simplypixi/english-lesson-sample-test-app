import envConfig from 'env-config';
import angular from 'angular';
import translate from 'angular-translate';
import translateLocalStorage from 'angular-translate-storage-local';
import translateCookieStorage from 'angular-translate-storage-cookie';
import translateStaticLoader from 'angular-translate-loader-static-files';

import translateConfig from './translate.config';
import LiteralLanguageLoader from './literalLanguageLoader.service';

export default angular.module('config', [
  translate,
  translateLocalStorage,
  translateCookieStorage,
  translateStaticLoader
]).config(envConfig.translate ? translateConfig : () => {})
  .factory('LiteralLanguageLoader', LiteralLanguageLoader)
  .name;
