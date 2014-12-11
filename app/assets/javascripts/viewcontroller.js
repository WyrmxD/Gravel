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
			$('#js-picture_input').trigger('click');
		});

		$('#local_picture').on('click', function() {
			$('#js-file_input').trigger('click');
		});

		$('#js-picture_input').change(function(event){
			event.preventDefault();
			PicLib.pictureTaken();
		})

		$('#js-file_input').change(function(event){
			event.preventDefault();
			PicLib.fileSelected();
		})
	}

	/* HIDE & SEEK */
	ns.show_picture_preview = function(){
		$('#js-picture_upload').hide();
		
		$('#js-picture_preview').removeClass('hidden');
		$('#js-picture_preview').show();
	}

	ns.show_picture_upload = function(){
		$('#js-picture_upload').show();
		$('#js-picture_preview').hide();
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

