/**
 * Module that contains all the services
 * @module
 */

angular.module('app.services', [
  'ngCordova'
])

.service('LocationService', function($cordovaGeolocation, $ionicPlatform, $ionicPopup, $q) {
  /** 
   * Takes a callback whose first argument contains current location. Displays an error to the user if location cannot be found.
   * @param {func} callback - The function that recieves the lat and long
   */
  this.getCurrentLocation = function() {
    var options = {
      timeout: 10000,
      enableHighAccuracy: false
    };
    // Note: cordova plugins must be wrapped in document.ready or $ionicPlatforml.ready
    var dfd = $q.defer();

    $ionicPlatform.ready(function() {
      $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position) {
          dfd.resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, function(err) {
          console.log(err);
        });
    });

    return dfd.promise;
  };

})

.service('RestBusService', function($http, $q, $ionicLoading, LocationService, ReadFileService, MapService) {
  /** 
   * Gets the stations that are closest in proximity to the user 
   * @param {object} latlon - Object with a latitude and longitude of user
   */
  var routes = [];
  this.getRoutes = function() {
    var dfd = $q.defer();

    LocationService.getCurrentLocation().then(function(latlon){
      // Change url to your own deployed API. See more instructions on README.md
      $http({
        url: 'http://mybus-api.herokuapp.com/locations/' + latlon.latitude + ',' + latlon.longitude + '/predictions',
        method: 'GET'
      }).success(function(data) {
        routes = data;
        dfd.resolve(data);
      });

    });

    return dfd.promise;
  };
  /** 
   * Gets the route information from the route clicked on the home screen 
   * @param {string} uniqId - String from url
   */
  this.getRoute =  function(uniqId) {
    var dfd  = $q.defer();
    routes.forEach(function(route) {
      if (route.stop.id + route.route.id === uniqId) {
        dfd.resolve(route);
      }
    });
    return dfd.promise;
  };
  
  /** 
   * Gets the latitude and longitude of a specific stop by route 
   * @param {object} map - Instance of google maps map
   * @param {object} route - Current selected route
   * @param {string} image - path to image file
   */

  this.getStationLocation = function(map, route, image) {

    ReadFileService.readFile('../stops.json')
    .then(function(data) {
      var station = data.data[route.stop.id];
      var loc = {latitude: station.lat, longitude: station.lon};
      MapService.createMarker(map, loc, image);
    });

  };

})

.service('VehiclesService', function($http) {
  
  /** 
   * Gets the list of vehicles by agency from the restbus API
   */
  this.getVehicles = function() {
    return $http({
      // Change url to your own deployed API. See more instructions on README.md
      url: 'http://mybus-api.herokuapp.com/agencies/sf-muni/vehicles',
      method: 'GET'
    });
  };
})

.service('ReadFileService', function($http) {

  /**
  * Read a specific file
  * @param {string} loc - location of file
  */
  this.readFile = function(loc) {
    return $http({
      url: loc,
      method: 'GET'
    });
  };
  
})

.service('MapService', function(LocationService, VehiclesService) {

  /**
  * Creates a google maps map
  * @param {object} loc - Contains latitude and longitude where the map should be centered
  */
  this.createMap = function(loc) {
    // var sanFran = {lat: 37.78, lng: -122.416}
    var mapOptions = {center: {lat: loc.latitude, lng: loc.longitude}, zoom: 17};
    return new google.maps.Map(document.getElementById('mapContainer'), mapOptions);
  };
  
  /**
  * Creates a marker on a google maps map
  * @param {object} map - Instance to place markers on
  * @param {object} loc - Object with a latitude and longitude of marker
  * @param {string} image - file path of image to use
  */
  this.createMarker = function(map, loc, image) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(loc.latitude, loc.longitude),
        map: map,
        icon: image
      });
  };
  
  /**
  * Creates a marker on a google maps map
  * @param {object} map - Instance to place markers on
  * @param {object} loc - Object with a latitude and longitude of user
  * @param {string} image - file path of image to use
  */
  this.displayUser = function(map, loc, image) {
    return this.createMarker(map, loc, image);
  };

  /**
  * Creates a marker on a google maps map
  * @param {object} map - Instance to place markers on
  * @param {string} - vehicle id
  * @param {object} loc - Object with a latitude and longitude of vehicle
  * @param {string} image - file path of image to use
  */
  this.displayVehicle = function(map, id, loc, image) {
    var vehicleMarker = {
      marker: new google.maps.Marker({
          position: new google.maps.LatLng(loc.latitude, loc.longitude),
          map: map,
          icon: image
        }),

      id: id
    };

    return vehicleMarker;
  };

  /**
  * Creates a marker on a google maps map
  * @param {object} map - Instance to place markers on
  * @param {object} loc - Object with route information
  * @param {string} image - file path of image to use
  */
  this.displayVehicles = function(map, route, image) {
    var displayVehicle = this.displayVehicle;
    var markersArray = [];

    //put vehicles on map
    VehiclesService.getVehicles()
      .then(function(data) {
        var vehicles = data.data;
        var routeId = route.route.id;

        for(var i = 0, len = vehicles.length; i < len; i++) {
          if(vehicles[i].routeId === routeId) {
            var loc = {latitude: vehicles[i].lat, longitude: vehicles[i].lon};
            markersArray.push(displayVehicle(map, vehicles[i].id, loc, image));
          }
        }
      });

    return markersArray;
  };

  /**
  * refresh user marker location
  * @param {object} marker
  */
  this.refreshUserMarker = function(marker){
    if(marker === undefined) {
      return ;
    }

    // change position of user using new lat lng
    LocationService.getCurrentLocation()
      .then(function(data){
        marker.setPosition(new google.maps.LatLng(data.latitude, data.longitude));
      });
  };

  /**
  * refresh locations of markers in an array of markers
  * @param {array} markers
  */
  this.refreshVehicleMarkers = function(markers){
    if(markers === undefined) {
      return ;
    }

    var vehicleMarkers = {};

    VehiclesService.getVehicles()
      .then(function(data){
        var vehicles = data.data;
        
        // add route vehicles to object
        for(var i = 0, len = markers.length; i < len; i++) {
          vehicleMarkers[markers[i].id] = markers[i];
        }

        // change position of vehicle makers using new lats and lngs
        for(var j = 0, len2 = vehicles.length; j < len2; j++) { 
          if(vehicleMarkers[vehicles[j].id]) {
            var lat = vehicles[j].lat;
            var lng = vehicles[j].lon;
            vehicleMarkers[vehicles[j].id].marker.setPosition(new google.maps.LatLng(lat, lng));
          }
        }

      });
    
  };

})

.service('AuthService', function($firebaseAuth){
  var usersRef = new Firebase('https://betterbus.firebaseio.com/users');
  return $firebaseAuth(usersRef);
}); 



