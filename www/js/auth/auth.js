angular.module('app.auth', [])

  .controller('LoginController', function($scope, Auth) {
    $scope.login = function() {
      Auth.$authWithOAuthRedirect('facebook').then(function(authData){
        //redirect?
      }).catch(function(error) {
        if(error.code === 'TRANSPORT_UNAVAILABLE') {
          Auth.$authWithOAuthPopup('facebook').then(function(authData){
            //redirect?
          });
        } else {
          console.error(error);
        }
      });
    };
  }); 