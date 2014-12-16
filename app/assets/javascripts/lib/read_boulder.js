"use strict";

var ReadBoulder = {};
(function(ns){

	var PICTURE_PATH = "uploads/"
	var THUMBNAIL_PATH = "uploads/thumbs/"
	var boulder;

	ns.load_boulder = function(myBoulder){
		boulder = myBoulder;
		console.log(boulder);
		$('#boulder_picture').prop('src', PICTURE_PATH + boulder.picture);
		$('.boulder_read_name').append(boulder.name);
		$('.boulder_read_location').append(boulder.location);
		async_map_load(boulder);
	}

	function async_map_load(){
		var maps_api_url = 'https://maps.googleapis.com/maps/api/js?v=3.exp&';
		var callback_url = 'callback=ReadBoulder.external_map_js_success';
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = maps_api_url + callback_url;
		document.body.appendChild(script);
	}

	ns.external_map_js_success = function(){
		console.log('API cargada');
		var mapOptions = {
			zoom: 13,
			center: new google.maps.LatLng(boulder.latitude, boulder.longitude)
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}


}(ReadBoulder));