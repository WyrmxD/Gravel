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

		set_edit_boulder_event();
		Maps.async_map_load(boulder);
	}

	function set_edit_boulder_event(){
		$('#js-edit_icon').click(function(event){
			event.preventDefault();
			ViewController.show_edit_boulder(boulder);
		})
	}

	ns.errorGetBoulder = function(data){
		console.log("error GET ", data);
	}

}(ReadBoulder));