angular.module('app.auth', [])

  .controller('LoginController', function($scope, AuthService) {
    $scope.login = function() {
      AuthService.$authWithOAuthRedirect('facebook').then(function(authData){
        debugger;
        console.log(authData);
      });
    };
    console.dir(AuthService);
    AuthService.$onAuth(function(authData){
      if(authData === null) console.log('not logged in yet!');
      else console.log('logged in as', authData.uid);
      $scope.authData = authData;
    });
  }); 