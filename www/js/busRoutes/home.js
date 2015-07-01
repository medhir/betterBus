angular.module('app.home', [])

.controller('HomeController', function($scope, routes, RestBusService) {
    $scope.routes = routes;


    
    //Called from ionic pulldown refresh
    $scope.doRefresh = function() {
      RestBusService.getRoutes()
      .then(function(data) {
        $scope.routes = data;
      });
      $scope.$broadcast('scroll.refreshComplete');
    }
  });