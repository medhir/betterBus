angular.module('app.details', [])

  .controller('DetailsController', function($scope, $state, route, LocationService, userLocation, RestBusService, VehiclesService, MapService) {
    $scope.route = route;
    $scope.userLocation = userLocation;
    $scope.map = MapService.createMap($scope.userLocation);
    $scope.userMarker = MapService.displayUser($scope.map, $scope.userLocation, './img/user.png');
    $scope.vehicleMarkers = MapService.displayVehicles($scope.map, $scope.route, './img/bus.png');
    RestBusService.getStationLocation($scope.map, route, './img/station.png');
    
    //Called from ionic pulldown refresh
    $scope.doRefresh = function() {
      MapService.refreshUserMarker($scope.userMarker);
      MapService.refreshVehicleMarkers($scope.vehicleMarkers);

      $scope.$broadcast('scroll.refreshComplete');
    };

    //this is different way to change app state than what is already present...refer to menu.html
    //injected $state into controller in arguments list
    $scope.redirect = function(){
      console.log('this function will redirect page to attractions page')
      $state.go('app.attractions');
    }




    //Initial page load
    $scope.doRefresh();

  });


//testStops will include mock testStops
//mock 

//need to display yelp icon