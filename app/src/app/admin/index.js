import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './admin.routes';
import adminController from './admin.controller';

export default angular.module('app.admin', [
  uirouter
])
  .config(routing)
  .filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if(reverse) filtered.reverse();
      return filtered;
    };
  })
  .controller('AdminController', adminController)
  .name;
