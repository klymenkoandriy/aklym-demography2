/**
 * Draws chart of JSON data in accordance to selectedProp.
 */
showSelectedChart = function(info, selectedProp) {

	//prepare data
    var countryName1 = info[0].countryName;
    var data1 = info[0][selectedProp.key];
    if(data1 == null){
    	data1 = [];
    }

    //prepare data 2
    var countryName2 = "";
    var data2 = [];

    if (info.length == 2){
        countryName2 = info[1].countryName;
        data2 = info[1][selectedProp.key];
        if(data2 == null){
        	data2 = [];
        }
    }
    
    //check for not empty and set year range
    var minYear = 0;
    var maxYear = 0;
    
    if (data1.length == 0) {
    	if(data2.length == 0){
    		return false;
    	}else{
    		minYear = data2[data2.length - 1].year;
    		maxYear = data2[0].year;
    	}
    }else{
		minYear = data1[data1.length - 1].year;
		maxYear = data1[0].year;
    	
    	if(data2.length != 0){
            if (minYear > data2[data2.length - 1].year) minYear = data2[data2.length - 1].year;
            if (maxYear < data2[0].year) maxYear = data2[0].year;
    	}
    }

    //fill value arrays
    var years = [];
    var valData1 = [];
    var valData2 = [];

    var i, nextYear;
    for(nextYear = minYear, i = 0; maxYear >= nextYear; nextYear++, i++) {
    	years.push(nextYear);
        valData1.push(getDataByYear(data1, nextYear));
        if(data2.length != 0){
        	valData2.push(getDataByYear(data2, nextYear));
        }
    }

    //Fill datasets for Chart (if quantity type is used)
    var datasetsGet = [];

	datasetsGet.push({
		label : countryName1,
		data : valData1,
		backgroundColor : "rgba(255,204,153,0.3)"
	});

	if (valData2.length != 0) {
		datasetsGet.push({
			label : countryName2,
			data : valData2,
			backgroundColor : "rgba(100,255,51,0.3)"
		});
	}
	;
    
    drawChart(years, datasetsGet);
    return true;
};


