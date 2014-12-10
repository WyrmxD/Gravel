"use strict";

var ViewController = {};
(function(ns){

	var content = document.getElementById('content');
	var boulders_stored;

	ns.show_boulders = function(){
		API.get('boulder.api_boulder_path', ns.display_boulders);
	}
	
	ns.display_boulders = function(boulders){
		boulders_stored = boulders;
		content.innerHTML = "";
		var boulder_div = HtmlHelpers.gen_boulder_grid(boulders_stored);
		content.appendChild(boulder_div);
	}

	ns.show_create_boulder = function(){
		content.innerHTML = "";
		var boulder_create_div = HtmlHelpers.gen_boulder_create_div();
		content.innerHTML = boulder_create_div;

		$('#camera_picture').on('click', function() {
			$('#pictureToUpload').trigger('click');
		});

		$('#local_picture').on('click', function() {
			$('#fileToUpload').trigger('click');
		});
	}

}(ViewController));


/*
/* NAVIGATION CAPTURED EVENTS 
 */

$('.js-api_boulder_path').click(function(event){
	event.preventDefault();
	ViewController.show_boulders();
})

$('.js-api_boulder_create_path').click(function(event){
	event.preventDefault();
	ViewController.show_create_boulder();
})