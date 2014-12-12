"use strict";

var Geolocation = {};
(function(ns){

	ns.getGeoposition = function(){
		
		if (navigator.geolocation) { 
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError); 
		} else {
			alert("GPS error: " + error);
		}
	}

	function geoSuccess(position){
		console.log('position', position);
		alert(position);
	}

	function geoError(){
		alert('Error GPS');
	}

}(Geolocation));