import _ from 'lodash';
import envConfig from 'env-config';
import appTemplate from './app.html';

export default ngInject(function ($translateProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      template: appTemplate,
      controller: 'AppController',
      controllerAs: 'app'
    });
});
