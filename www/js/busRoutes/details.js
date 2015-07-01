angular.module('app.details', [])

  .controller('DetailsController', function($scope, route, LocationService, userLocation, RestBusService, VehiclesService, MapService) {
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

    $scope.redirect = function(){
      console.log('this funciton will redirect page to attractions page')
    }

    $scope.testData = {
      businesses : [
        {
          name: "childSmasher",
          number: 4152729509,
          location: "Marina"
        },
        {
          name: "entrailDeceiever",
          number: 4158675309,
          location: "SoMa"
        }
      ]
    }


    //Initial page load
    $scope.doRefresh();

  });


//testStops will include mock testStops
//mock 

//need to display yelp icon