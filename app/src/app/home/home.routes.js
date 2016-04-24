import homeTemplate from './home.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/test',
      template: homeTemplate,
      controller: 'HomeController',
      controllerAs: 'home'
    });
});
