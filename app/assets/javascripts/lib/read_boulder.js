"use strict";

var ReadBoulder = {};
(function(ns){

	var PICTURE_PATH = "uploads/"
	var THUMBNAIL_PATH = "uploads/thumbs/"
	var boulder;

	ns.load_boulder = function(myBoulder){
		boulder = myBoulder;
		$('#boulder_picture').prop('src', PICTURE_PATH + boulder.picture);
		$('.boulder_read_name').append(boulder.name);
		$('.boulder_read_location').append(boulder.location);
		Maps.async_map_load(boulder);
	}

}(ReadBoulder));