angular.module('app.attractions', [])
	
	.controller('AttractionsController', function($scope){
		console.log('hello');
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



	})