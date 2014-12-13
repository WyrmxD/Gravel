"use strict";

var Geolocation = {};
(function(ns){

	ns.getGeoposition = function(success, error, not_supported){
		
		if (navigator.geolocation) { 
			navigator.geolocation.getCurrentPosition(success, error); 
		} else {
			not_supported();
			alert("GPS error: " + error);
		}
	}

}(Geolocation));