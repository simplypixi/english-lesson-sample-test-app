/**
 * ng-annotate helper
 */
window.ngInject = (fn) => fn;

/**
 * Global jquery to replace angular's jqLite
 */
window.jQuery = window.$ = require('jquery');

/**
 * Make sure angular is required before other node modules,
 * which often have imports with side effects
 */
require('angular');

/**
 * Include your application
 */
require('./src/app');
