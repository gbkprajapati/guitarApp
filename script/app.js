var app = angular.module("routeApp",["ngRoute"]);
           	app.config(function($routeProvider,$locationProvider){
                 	
                	 $locationProvider.html5Mode(true);
                 	$routeProvider
	                 	.when("/electric", {
	                 		templateUrl: "Templates/electric.html",
	                 		controller: "electricController"
	                 	})
	                 	.when("/reviewPage", {
	                 		templateUrl: "Templates/purchasePage.html"
	                 		//controller: "reviewPageController"
	                 	})
            });

           	app.controller("electricController" , function($scope,$http,$location){
           			$scope.guitarCategory = "Electric Guitar List";
           			$scope.current = 0 ;

           			$http.get('json/guitardata.json')
	                 	.then(function(resp){
	                 		
	                 		$scope.guitarData = resp.data.allProducts;
	                })

	                $scope.Next = function() {
          				$scope.current = ($scope.current + 1) % $scope.guitarData.length;

          				console.log("Next button " + ($scope.current + 1) % $scope.guitarData.length);
        			};

        			$scope.Previous = function() {

        				//console.log("Before Previous button " + $scope.current);
        				if($scope.current == 0){
        					$scope.current = 0;
        				}else{
          					$scope.current = ($scope.current - 1) % $scope.guitarData.length;
          				}	
          				//console.log("Previous button " + ($scope.current - 1) % $scope.guitarData.length);
        			};

        			$scope.buyButton =  function(){

        				$location.path("/purchasePage/");

        			};
                 	 
           	});
        		

                 

                 
