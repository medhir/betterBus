angular.module('app.authService', ['ionic', 'firebase'])

.service('Auth', function($firebaseAuth){
  var usersRef = new Firebase('https://betterbus.firebaseio.com/users');
  return $firebaseAuth(usersRef);
}); 
