angular.module('app.leaderboard', [])
	
	.controller('LeaderboardController', function($scope){

		//the below data will eventually conform with the businesses data received from yelp api
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
