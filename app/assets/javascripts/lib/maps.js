"use strict";

var Maps = {};
(function(ns){

	var boulder;
	var maps_api_not_loaded = true;

	ns.async_map_load = function(myBoulder){
		boulder = myBoulder;
		if (maps_api_not_loaded){
			load_maps_script();
		} else {
			ns.external_map_load_success();
		}
	}

	function load_maps_script(){
		var maps_api_url = 'https://maps.googleapis.com/maps/api/js?v=3.exp&';
		var callback_url = 'callback=Maps.external_map_load_success';
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = maps_api_url + callback_url;
		document.body.appendChild(script);
		maps_api_not_loaded = false;
	}

	ns.external_map_load_success = function(){
		var mapOptions = {
			zoom: 13,
			center: new google.maps.LatLng(boulder.latitude, boulder.longitude)
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		var boulderPos = new google.maps.LatLng(boulder.latitude, boulder.longitude);
		addMark(map, boulderPos);
	}

	function addMark(map, myPos){
		var marker = new google.maps.Marker({
			position: myPos,
			draggable: false,
			map: map
		});
		marker.setMap(map);
	}

}(Maps));