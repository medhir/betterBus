angular.module('app.filters', [])

  .controller('FilterController', function($scope, FilterService){
    $scope.filters = FilterService;

    $scope.addFilter = function() {
      //add filter to db
      $scope.filters.$add({
        'name': $scope.filter
      });
      //clear filter form
      $scope.filter = '';
    };
  });