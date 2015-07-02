  angular.module('app.home', [])

.controller('HomeController', function($scope, routes, RestBusService,$firebaseObject,FirebaseService) {
    
    
    $scope.routes = routes;
    FirebaseService.updateUserRoute('5','Liam',100);

    
    //Called from ionic pulldown refresh
    //for testing purposes
    // YelpService.getLocalBusinesses({latitude:"37.789255",longitude:"-122.401225"},function(data){
    //   console.log(data);
    // });
    $scope.doRefresh = function() {
      RestBusService.getRoutes()
      .then(function(data) {
        $scope.routes = data;
      });
      $scope.$broadcast('scroll.refreshComplete');
    };
  });