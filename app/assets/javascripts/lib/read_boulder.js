"use strict";

var ReadBoulder = {};
(function(ns){

	var PICTURE_PATH = "uploads/"
	var THUMBNAIL_PATH = "uploads/thumbs/"

	ns.load_boulder = function(boulder){
		console.log(boulder);
		$('#boulder_picture').prop('src', PICTURE_PATH + boulder.picture);
		$('.boulder_read_name').append(boulder.name);
		$('.boulder_read_location').append(boulder.location);
	}

}(ReadBoulder));