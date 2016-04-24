export default ngInject(function LiteralLanguageLoader($q, $http) {
  return (options) => {
    return $http(angular.extend({
      url: options.langs[options.key],
      method: 'GET',
      params: ''
    }, options.$http))
      .then(function (result) {
        return result.data;
      }, function () {
        return $q.reject(options.key);
      });
  };
});
