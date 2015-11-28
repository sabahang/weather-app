$(".convert .btn").click(function() {
	var btn = $(".convert .btn");
	if (btn.attr('data-unit') === "metric"){
		btn.attr('data-unit', 'imperial');
		btn.text('Metric');
		getCurrentLocation();
	} else {
		btn.attr('data-unit', 'metric');
		btn.text('Imperial');
		getCurrentLocation();
	}
});
getCurrentLocation();

function getCurrentLocation(){
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	function success(pos) {
		var unit = $(".convert .btn").attr('data-unit');
		getWeather(pos.coords.latitude, pos.coords.longitude, unit);
	};
	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
		console.log("Falling back to IP based geolocation...");
		getLocationByIP();
	};
	navigator.geolocation.getCurrentPosition(success, error, options);
}
function getWeather(lat,lon,unit){
	var url = "http://api.openweathermap.org/data/2.5/weather?\
	lat=" + lat + "&lon=" + lon + "&units=" + unit + "&appid=1d8f6820c9fd96687cefdf7bd7cfa826";
	$.getJSON( url, function( data ) {
		showWeather(data);
	});
}
function showWeather( data ){
	var hr = (new Date()).getHours();
	var currUnit = $(".convert .btn").attr('data-unit');
	$(".condition").text("Weather in " + data.name + " is with " + data.weather[0].description);
	// $(".temp").text(data.main.temp + String.fromCharCode(160) + $("<div/>").html("&deg;").text() + ( currUnit === "metric" ? "C" : "F"));
	$(".owf").attr("data-content", Math.round(Number(data.main.temp)) + $("<div/>").html("&deg;").text() + ( currUnit === "metric" ? "C" : "F"));
	$(".humidity").text(data.main.humidity +  $("<div/>").html("&#37;").text());
	$(".wind").text(data.wind.speed + String.fromCharCode(160) + ( currUnit === "metric" ? "m/s" : "mph"));
	$(".direction").text(direction(Number(data.wind.deg)));
	$(".icon > i").addClass("owf-" + data.weather[0].id.toString() + (isNight(data) ? "-n" : ""));
	$("body").css("background-image","url(\"images/" + Math.floor(Number(data.weather[0].id)/100) + ".jpg\")");
}
function direction(val){
  var directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
  return directions[ Math.floor(((val % 360) / 45)) ];
}
function isNight(data){
	var sunrise = new Date(Number(data.sys.sunrise) * 1000).getHours(); // in millisec
	var sunset = new Date(Number(data.sys.sunset) * 1000).getHours(); //in millisec
	var time = new Date().getHours();
	if (time >= sunset || time <= sunrise) return true; else return false;
}
function getLocationByIP(){
	var unit = $(".convert .btn").attr('data-unit');
	$.getJSON('//freegeoip.net/json/', function(location) {
    	getWeather(location.latitude, location.longitude, unit);
	})
	.error(function(err) { console.warn('ERROR(' + err.code + '): ' + err.message); 
		console.log("Both HTML5 and IP Based geolocationing has failed!") 
	});
}

