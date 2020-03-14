/**
 * Main controller
 */
app.controller("countriesCtrl", function($scope, $http, REQUEST_TEMPLATE, COUNTRIES_URL, PROPERTIES_URL, $location) {
	
	$scope.properties = [];

	$scope.title = "Choose required parameters";
	
	$scope.currentYear = new Date().getFullYear();
	
	$scope.status = "";
	$scope.showMe = false;
	
	$scope.fromYears = getYearsSelectSet(2000);
	$scope.toYears = getYearsSelectSet($scope.currentYear);
	
	$scope.countryCode1 = "";
	$scope.countryCode2 = "";
	$scope.fromYear = 2000;
	$scope.toYear = $scope.currentYear;
	$scope.quantityType = true;
	
	$scope.chooseBut = "Chose property";
	$scope.choose = false;
	
	$http.get(COUNTRIES_URL).then(function(res) {
		$scope.countries = res.data;
	});
	
	$http.get(PROPERTIES_URL).then(function(res) {
		$scope.properties = res.data;
	});
	
	$scope.selectedProp = null;
	
	$scope.setQuantityType = function(quantityType) {
		$scope.quantityType = quantityType;
	}

	$scope.setCountryCode1 = function(countryCode1) {
		$scope.countryCode1 = countryCode1;
	}
	
	$scope.setCountryCode2 = function(countryCode2) {
		$scope.countryCode2 = countryCode2;
	}
	
	$scope.setFromYear = function(fromYear) {
		$scope.fromYear = fromYear;
	}
	
	$scope.setToYear = function(toYear) {
		$scope.toYear = toYear;
	}

    $scope.showProp = function() {
        $scope.choose = !$scope.choose;
        if($scope.choose){
        	$scope.chooseBut = "Accept";
        	$scope.showMe = false;
        }else{
        	$scope.chooseBut = "Chose property";
        	$scope.updateData();
        }
    }
	
    $scope.chooseProp = function(index) {

    	var length = $scope.properties.length;
    	
    	$scope.selectedProp = $scope.properties[index];
    	
    	for(var i = 0; i < length; i++){
    		if(i != index){
    			$scope.properties[i].use = false;
    		}else{
    			$scope.title = $scope.properties[i].name;
    			$scope.description = $scope.properties[i].description;
    		}
    	}
    }
    
    /**
     * Initialisation
     */
	$scope.varInit = function() {
		
		$scope.selectedProp = null;
		$scope.status = "";
		$scope.chooseBut = "Chose property";
		$scope.choose = false;
		$scope.request = "";
		$scope.response = "";
		$scope.test = "";
		
		$scope.title = "Choose required parameters";
		$scope.description = "Choose any demographic parameter for one or two countries";
		
    	for(var i = 0; i < $scope.properties.length; i++){
    		$scope.properties[i].use = false;
    	}
	}
	
	/**
	 * Gets data from server and updates chart.
	 */
	$scope.updateData = function() {
		
		if($location.path() == '/choose' && $scope.selectedProp == null){
			return;
		}
		
		$scope.choose = false;
		$scope.chooseBut = "Chose property";
		
		var code1 = $scope.countryCode1.toLowerCase();
		var code2 = $scope.countryCode2.toLowerCase();		
		
		$scope.status = "Wait";
		$scope.showMe = false;
		
		if((code1.length == 0) && (code2.length == 0)){
			$scope.status = "Agrument Error";
			return;
		}

		//Set request
		var request =  REQUEST_TEMPLATE + '&data=';
		
		if($location.path() == '/choose'){
			request+= $scope.selectedProp.key;
		}else{
			request+= 'population,internetuser';
		}
		
		request+='&years='+ $scope.fromYear + ':' + $scope.toYear + '&countries=';
		
		if(code1.length == 0){
			request += code2;
		}else{
			request += code1;
			if((code2.length != 0) && (code1 != code2)){
				request += "," + code2;
			}
		}

		//send request
		$scope.request = request;
		$scope.response = [];
		var result = false;
		
		$http.get($scope.request).then(function(res) {
			if (res.data.type != 'error') {
				$scope.response = res.data;
				if($location.path() == "/choose"){
					$scope.test = "showSelectedChart";
					result = showSelectedChart(res.data, $scope.selectedProp);
				}else{
					$scope.test = "showFixedChart";
					result = showFixedChart(res.data, $scope.quantityType);
				}
			}
			
			if(result){
				$scope.status = "Success";
				$scope.showMe = true;
			}else{
				$scope.status = "Error";
				$scope.showMe = false;
			}
			
		});
	};
});
