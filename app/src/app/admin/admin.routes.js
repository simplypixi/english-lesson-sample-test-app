import adminTemplate from './admin.html';

export default ngInject(function ($stateProvider) {
  $stateProvider
    .state('app.admin', {
      url: '/qm',
      template: adminTemplate,
      controller: 'AdminController',
      controllerAs: 'admin'
    });
});
