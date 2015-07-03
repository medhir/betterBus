angular.module('app.auth', [])

.controller('LoginController', function($scope, SimpleAuthService, $state) {
  $scope.submit = function() {
    SimpleAuthService.loginUser($scope.email, $scope.password, function() {
      $state.go('app.routes');
    });
  };
})
.controller('SignupController', function($scope, SimpleAuthService, $state) {
  $('.passwordPopup').toggle(false);
  $('.emailPopup').toggle(false);

  $scope.regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  $scope.submit = function() {
    $('.passwordPopup').toggle(false);
    $('.emailPopup').toggle(false);
    var email = true;
    if(!$scope.regex.test($scope.email)){
      console.log('wrong email');
      $('.emailPopup').toggle(true);
      email=false;
    }
    if($scope.password===$scope.confirmPassword && email){

      SimpleAuthService.createUser($scope.email, $scope.password, function() {
        SimpleAuthService.loginUser($scope.email, $scope.password, function() {
          $state.go('app.routes');
        });
      });
    }
    else if($scope.password!==$scope.confirmPassword){
      $('.passwordPopup').toggle(true);
    }
  };
});
