/**
 * Draws chart for data set by years.
 */
drawChart =function(years, dataset) {
	
	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type : 'line',
		data : {
			labels : years,
			datasets : dataset
		}
	});
}

/**
 * Returns array of acceptable years.
 */
getYears = function() {
	var years = [];
	
	for (var i = 1970; i < 2051; i++){
		years.push(i);
	}
	
	return years;
};

/**
 * Returns Object which contains list of available years and 'selected' value.
 */
getYearsSelectSet = function(selected) {
	
	var data = {
		    availableOptions: getYears(),
		    selectedOption: selected
		    };
	
	return data;
};

/**
 * Return 'data' field of JSON Object form array with specified 'year' field,
 * or returns 0 if no such year.
 */
getDataByYear = function(dataVal, yearVal) {

	for (var i = 0; i < dataVal.length; i++){
		if(dataVal[i].year == yearVal) return dataVal[i].data;
	}
	
	return 0;
};