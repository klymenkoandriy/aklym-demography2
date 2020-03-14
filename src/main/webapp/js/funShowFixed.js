/**
 * Draws chart of JSON data according to quantityType.
 */
showFixedChart = function(info, quantityType) {

	//prepare data
    var countryName1 = info[0].countryName;
    var population1 = info[0].population;
    if(population1 == null) population1 = [];
    var internetuser1 = info[0].internetuser;
    if(internetuser1 == null) internetuser1 = [];

    //prepare data 2
    var countryName2 = "";
    var population2 = [];
    var internetuser2 = [];
    
    if (info.length == 2){
        countryName2 = info[1].countryName;
        population2 = info[1].population;
        if(population2 == null) population2 = [];
        internetuser2 = info[1].internetuser;
        if(internetuser2 == null) internetuser2 = [];
    }
    
    //check for not empty and set year range
    var minYear = 0;
    var maxYear = 0;
    
    if (population1.length == 0) {
    	if(population2.length == 0){
    		return false;
    	}else{
    		minYear = population2[population2.length - 1].year;
    		maxYear = population2[0].year;
    	}
    }else{
		minYear = population1[population1.length - 1].year;
		maxYear = population1[0].year;
    	
    	if(population2.length != 0){
            if (minYear > population2[population2.length - 1].year) minYear = population2[population2.length - 1].year;
            if (maxYear < population2[0].year) maxYear = population2[0].year;
    	}
    }

    //fill value arrays
    var years = [];
    var valPopulation1 = [];
    var valPopulation2 = [];
    var valInternUser1 = [];
    var valInternUser2 = [];

    var i, nextYear;
    for(nextYear = minYear, i = 0; maxYear >= nextYear; nextYear++, i++) {
    	years.push(nextYear);
        valPopulation1.push(getDataByYear(population1, nextYear));
        if(population2.length != 0){
        	valPopulation2.push(getDataByYear(population2, nextYear));
        }
        if(internetuser1.length != 0){
        	valInternUser1.push(getDataByYear(internetuser1, nextYear));
        }
        if(internetuser2.length != 0){
        	valInternUser2.push(getDataByYear(internetuser2, nextYear));
        }
    }

    //Fill arrays of percentage.
    var valPercentage1 = [];
    var valPercentage2 = [];
    
    if (!quantityType) {

    	for(var i = 0; i < valPopulation1.length; i++){

    		if(valPopulation1[i] != 0){
                valPercentage1.push(100 * valInternUser1[i]/valPopulation1[i]);
            }else{
                valPercentage1.push(0);
            };
            
            if(valPopulation2[i] != 0){
                valPercentage2.push(100 * valInternUser2[i]/valPopulation2[i]);
            }else{
                valPercentage2.push(0);
            };
        }
    }
    
    //Fill datasets for Chart (if quantity type is used)
    var datasetsGet = [];

    if (quantityType) {
		if (valPopulation1.length != 0) {
			datasetsGet.push({
				label : 'Population in ' + countryName1,
				data : valPopulation1,
				backgroundColor : "rgba(255,204,153,0.3)"
			});
		}
		if (valPopulation2.length != 0) {
			datasetsGet.push({
				label : 'Population in ' + countryName2,
				data : valPopulation2,
				backgroundColor : "rgba(100,255,51,0.3)"
			});
		}
		;
		if (valInternUser1.length != 0) {
			datasetsGet.push({
				label : 'Internet users in ' + countryName1,
				data : valInternUser1,
				backgroundColor : "rgba(153,255,204,0.3)"
			});
		}
		if (valInternUser2.length != 0) {
			datasetsGet.push({
				label : 'Internet users in ' + countryName2,
				data : valInternUser2,
				backgroundColor : "rgba(153,100,204,0.3)"
			});
		}
	}else{
        datasetsGet.push({
            label : ("Internet users % in ") + countryName1,
            data : valPercentage1,
            backgroundColor : "rgba(255,204,153,0.3)"
        });

        if (info.length == 2) {
            datasetsGet.push({
                label : ("Internet users % in ") + countryName2,
                data : valPercentage2,
                backgroundColor : "rgba(153,255,204,0.3)"
            });
        };
	}
    
    drawChart(years, datasetsGet);
    return true;
}



