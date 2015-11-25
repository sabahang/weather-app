//getCurrentLocation();

function getCurrentLocation(){
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		getWeather(pos.coords.latitude, pos.coords.longitude);
	   // var lat = coords.latitude;
	   // console.log(lat);
	  // lon = crd.longitude;
	  // console.log(lon);
	  //console.log('More or less ' + crd.accuracy + ' meters.');
	};

	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(success, error, options);
}
function getWeather(lat,lon){
	var url = "http://api.openweathermap.org/data/2.5/weather?\
	lat=" + lat + "&lon=" + lon + "&appid=1d8f6820c9fd96687cefdf7bd7cfa826";
	$.getJSON( url, function( data ) {
/*		var items = [];
		$.each( data, function( key, val ) {
			items.push( "<li id='" + key + "'>" + val + "</li>" );
		});*/
	showWeather(data);
});
}
function showWeather( data ){
	console.log(data.name);
}

