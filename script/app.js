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
	                 	.when("/confirmPageOrder" , {
	                 		templateUrl:"Templates/confirmOrderPage.html",
	                 		controller: "confirmOrderController"
	                 	});
            });



           	///electricController Start
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
                 	 
           	}); 	///electricController End

           	//Review page Controller start 
           	app.controller("reviewPageController" , function($scope,$http,sharedData,$location,getUserData){
				$scope.image = sharedData.imageShow;
				$scope.productDescription  = sharedData.productDescription ;
				$scope.productPrice = sharedData.productPrice;
				$scope.shippingCharges = sharedData.shippingCharges;


				//User Details
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.creditCardNumber = '';
				$scope.emailId = '';

                //Show div when user click on review order 



				$http.get('json/guitardata.json')
	                 	.then(function(resp){
	                 		
	                 		$scope.guitarData = resp.data.allProducts;
	            })

	             //console.log(guitarData[shippingCharges].shipping_details);
	            //Preview Order info  	


	           /* $scope.hideDiv = true;
                $scope.showDiv = false;*/

	            $scope.previewOrderInfo = function(){

	            	$scope.showDiv = true;
	            	$scope.hideDiv = true;
	            	$scope.previewFirstName = $scope.firstName;

	            	$scope.previewLastName = $scope.lastName;
	            	$scope.previewCreditCardNumber = $scope.creditCardNumber;
	            	$scope.previewEmailId  = $scope.emailId;
	            }; 

	            $scope.editOrder =  function(){
	            	$scope.showDiv = false;
	                $scope.hideDiv = false;
	                $scope.previewFirstName = $scope.firstName;
	            	$scope.previewLastName = $scope.lastName;
	            	$scope.previewCreditCardNumber = $scope.creditCardNumber;
	            	$scope.previewEmailId  = $scope.emailId;
	            }

	            $scope.confirmOrder = function(){
	            	$location.path("/confirmPageOrder");
	            	getUserData.getfirstName = $scope.previewFirstName;
	            	console.log(getUserData.getfirstName);

	            	getUserData.getlastName = $scope.previewLastName;
	            	getUserData.getuserEmailId = $scope.previewEmailId;
	            };


			}); //	Review page Controller end 


           	//Confirm Order Controller Start
			app.controller("confirmOrderController" , function($scope,sharedData,getUserData,$http,$location){

				    
				    $scope.image = sharedData.imageShow;
					$scope.firstName = getUserData.getfirstName;
					$scope.lastName = getUserData.getlastName;
					$scope.emailId =  getUserData.getuserEmailId;
					$scope.productPrice = sharedData.productPrice;
					$scope.shippingCharges = sharedData.shippingCharges;

					$http.get('json/guitardata.json')
		                 	.then(function(resp){
		                 		
		                 		$scope.guitarData = resp.data.allProducts;
		            })

		            $scope.goHome = function(){
		            	$location.path("/");
		            };


			});




           	/// Services Comes here
            app.service('sharedData',function(){
				this.imageShow = '';
				this.productDescription = '';
				this.productPrice = '';
				this.shippingCharges = '';


			});

			//service for get user data

			app.service('getUserData', function(){
				this.getfirstName = '';
				this.getlastName = '';
				this.getuserEmailId = '';
			});


			//filter comes here
			app.filter('getInt', function(){
				return function(valString){
					var number = parseInt(valString.match(/[0-9]+/)[0], 10);
        			return number;
				};
			});

			
        		

                 

                 
