angular.module('app.home', [])

.controller('HomeController', function($scope, routes, RestBusService,YelpService) {
    $scope.routes = routes;
    
    //Called from ionic pulldown refresh
    //for testing purposes
    // YelpService.getLocalBusinesses(function(data){
    //   console.log(JSON.stringify(data));
    // });
    $scope.doRefresh = function() {
      RestBusService.getRoutes()
      .then(function(data) {
        $scope.routes = data;
      });
      $scope.$broadcast('scroll.refreshComplete');
    };
  });