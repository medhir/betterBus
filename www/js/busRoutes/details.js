angular.module('app.details', [])

  .controller('DetailsController', function($scope, route, LocationService, userLocation, RestBusService, MapService, VehiclesService) {
    $scope.route = route;
    $scope.userLocation = userLocation;
    $scope.map = MapService.createMap($scope.userLocation);
    $scope.userMarker = MapService.displayUser($scope.map, $scope.userLocation, './img/user.png');
    $scope.vehicleMarkers = MapService.displayVehicles($scope.map, $scope.route, './img/bus.png');
    RestBusService.getStationLocation($scope.map, route, './img/station.png');
    
    //Called from ionic pulldown refresh
    $scope.doRefresh = function() {
      console.log('refreshed');
      MapService.refreshUserMarker($scope.userMarker);
      MapService.refreshVehicleMarkers($scope.vehicleMarkers);

      $scope.$broadcast('scroll.refreshComplete');
    };
    //Initial page load
    $scope.doRefresh();

  });
