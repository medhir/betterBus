angular.module('app.details', [])


  .controller('DetailsController', function($scope, $state, route, LocationService, userLocation, RestBusService, MapService, VehiclesService, YelpService) {
    RestBusService.getRouteDetailed(route.route.id) //since the app.details stateparams only use the uniqId for now, it doesn't have the route info so we can't do it all in the app.js router part like they did for route
    .then(function(data) {
      $scope.stops = data.stops;
      $scope.stopMarkers = [];
      data.stops.forEach(function(stop, index) {
        //omg mapservice is horribly WET... ikr smh lolz
        $scope.stopMarkers[index] = MapService.createMarker($scope.map, {latitude: stop.lat, longitude: stop.lon}, './img/stop.png');

        //create event listener
        google.maps.event.addListener($scope.stopMarkers[index], 'click', function() {
          YelpService.getLocalBusinesses({latitude: stop.lat, longitude: stop.lon}, function(data) {
            console.log(data);
          });
          // new google.maps.InfoWindow({
          //   content: YelpService.getYelpContent()
          // }).open($scope.map, $scope.stopMarkers[index]);
        });
      });
    });
    $scope.route = route;
    $scope.userLocation = userLocation;
    $scope.map = MapService.createMap($scope.userLocation);
    $scope.userMarker = MapService.createMarker($scope.map, $scope.userLocation, './img/user.png');
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