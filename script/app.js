var app = angular.module("routeApp",["ngRoute"]);
           	app.config(function($routeProvider,$locationProvider){
                 	
                	 $locationProvider.html5Mode(true);
                 	$routeProvider
	                 	.when("/electric", {
	                 		templateUrl: "Templates/electric.html",
	                 		controller: "electricController"
	                 	})
	                 	.when("/purchasePage", {
	                 		templateUrl: "Templates/purchasePage.html",
	                 		controller: "reviewPageController"
	                 	})
            });



           	///controller Comes here
           	app.controller("electricController" , function($scope,$http,$location,sharedData){
           			$scope.guitarCategory = "Electric Guitar List";
           			$scope.current = 0 ;

           			$http.get('json/guitardata.json')
	                 	.then(function(resp){
	                 		
	                 		$scope.guitarData = resp.data.allProducts;
	                })

	                $scope.Next = function() {
          				$scope.current = ($scope.current + 1) % $scope.guitarData.length;

          				//console.log("Next button " + ($scope.current + 1) % $scope.guitarData.length);
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

        				$location.path("/purchasePage");
        				//console.log($scope.current);
        				//console.log($scope.data = $scope.guitarData[current].price);
        				sharedData.imageShow = $scope.current;
        				sharedData.productDescription = $scope.current;
        				sharedData.productPrice  = $scope.current;
        				sharedData.shippingCharges = $scope.current;
        			};
                 	 
           	});


           	app.controller("reviewPageController" , function($scope,$http,sharedData){
				$scope.image = sharedData.imageShow;
				$scope.productDescription  = sharedData.productDescription ;
				$scope.productPrice = sharedData.productPrice;
				$scope.shippingCharges = sharedData.shippingCharges;
				$http.get('json/guitardata.json')
	                 	.then(function(resp){
	                 		
	                 		$scope.guitarData = resp.data.allProducts;
	            })

	             //console.log(guitarData[shippingCharges].shipping_details);
			});



           	/// Services Comes here
            app.service('sharedData',function(){
				this.imageShow = '';
				this.productDescription = '';
				this.productPrice = '';
				this.shippingCharges = '';	
			});


			//filter comes here
			app.filter('getInt', function(){
				return function(valString){
					var number = parseInt(valString.match(/[0-9]+/)[0], 10);
        			return number;
				};
			});

			
        		

                 

                 
