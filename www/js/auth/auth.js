angular.module('app.auth', ['ionic'])

.factory('LoginFactory', function($state, $ionicPopup) {
  var methods = {};
  methods.success = function() {
    $state.go('app.routes');
  };
  methods.error = function() {
    $ionicPopup.alert({
           title: 'Login Failed!',
           template: 'Please check your username/password, or go to the signup page.'
         });
  };
  return methods;
})

.controller('LoginController', function($scope, SimpleAuthService, $state, LoginFactory) {
  $scope.submit = function() {
    SimpleAuthService.loginUser($scope.email, $scope.password, LoginFactory.success, LoginFactory.error);
  };
})
.controller('SignupController', function($scope, SimpleAuthService, $state, LoginFactory) {
  $scope.submit = function() {
    SimpleAuthService.createUser($scope.email, $scope.password, function() {
      SimpleAuthService.loginUser($scope.email, $scope.password, LoginFactory.success, LoginFactory.error);
    });
  };
});
