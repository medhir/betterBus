angular.module('app.details', [])
.controller('DetailsController', function($scope, route, LocationService, userLocation, RestBusService, MapService, VehiclesService, YelpService, SimpleAuthService, FirebaseService) {
  var authData = SimpleAuthService.authData;
  if (authData) {
    $scope.userId = authData.uid;
    //FirebaseService.
  }

  RestBusService.getRouteDetailed(route.route.id) //since the app.details stateparams only use the uniqId for now, it doesn't have the route info so we can't do it all in the app.js router part like they did for route
  .then(function(data) {
    $scope.stops = data.stops;
    RestBusService.getStationLocation($scope.map, route, $scope.stops, function() {
      $scope.stationMarker = MapService.createMarker($scope.map, RestBusService.closestStop.loc, './img/station.png');
    });
    $scope.stopMarkers = [];
    //$scope.stops = data.stops;
    //_.pluck(data.stops, 
    debugger;
    data.stops.forEach(function(stop, index) {
      $scope.stopMarkers[index] = MapService.createMarker($scope.map, {latitude: stop.lat, longitude: stop.lon}, './img/stop.png');

      //create event listener
      google.maps.event.addListener($scope.stopMarkers[index], 'click', function() {
        YelpService.getLocalBusinesses({latitude: stop.lat, longitude: stop.lon}, function(data) {
          console.log(data);
          var place = data[YelpService.feelingLucky(data.length)];
          new google.maps.InfoWindow({
            content: YelpService.formatData(place)
          }).open($scope.map, $scope.stopMarkers[index]);
        });
      });
      var stopLocs = [];
      for (var i = 0; i < data.stops.length; i++) {
        stopLocs.push([data.stops[i].lat,data.stops[i].lon]);
      }
      MapService.createRouteLine(stopLocs,$scope.map);
      google.maps.event.addDomListener(window, 'load');
    });
  });
  $scope.route = route;
  //testing for yelp
  // RestBusService.getRouteDetailed(route.route.id)
  // .then(function(data){
  //   console.log(data);
  //   YelpService.getYelpForRoute(data, function(results){
  //     console.dir(results);
  //   });
  // });
  $scope.userLocation = userLocation;
  $scope.map = MapService.createMap($scope.userLocation);
  $scope.userMarker = MapService.createMarker($scope.map, $scope.userLocation, './img/user.png');
  $scope.vehicleMarkers = MapService.displayVehicles($scope.map, $scope.route, './img/bus.png');

  //Called from ionic pulldown refresh
  $scope.doRefresh = function() {
    //MapService.refreshStationMarker($scope.stationMarker);
    MapService.refreshUserMarker($scope.userMarker);
    MapService.refreshVehicleMarkers($scope.vehicleMarkers);
    debugger;
    if ($scope.userId) FirebaseService.visitStop(route.route.id, $scope.userId, RestBusService.closestStop.id); //user optionally logged in

    $scope.$broadcast('scroll.refreshComplete');
  };

  //Initial page load
  $scope.doRefresh();

});


//testStops will include mock testStops
//mock 

//need to display yelp icon
