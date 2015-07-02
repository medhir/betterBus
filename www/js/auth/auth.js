angular.module('app.auth', [])

  .controller('LoginController', function($scope, SimpleAuthService, $state) {
    $scope.submit = function() {
      SimpleAuthService.loginUser($scope.email, $scope.password, function() {
        $state.go('app.routes');
      });
    };
  })
  .controller('SignupController', function($scope, SimpleAuthService, $state) {
    $scope.submit = function() {
      SimpleAuthService.createUser($scope.email, $scope.password, function() {
        SimpleAuthService.loginUser($scope.email, $scope.password);
        $state.go('app.routes');
      });
    };
  });
