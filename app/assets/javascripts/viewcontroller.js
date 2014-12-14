"use strict";

var ViewController = {};
(function(ns){

	/* APP Status */
	var boulders_stored;
	// var preview_angle = 0;
	// var boulder_draft = null;
	var new_image;

	/* HTML Elements */
	var content = document.getElementById('content');

	/*
	 * Boulders List
	 */
	ns.show_boulders = function(){
		API.get('boulder.api_boulder_path', ns.display_boulders);
	}
	
	ns.display_boulders = function(boulders){
		boulders_stored = boulders;
		content.innerHTML = "";
		var boulder_div = HtmlHelpers.gen_boulder_grid(boulders_stored);
		content.appendChild(boulder_div);
	}

	/*
	 * New Boulder 
	 */
	ns.show_create_boulder = function(reset){
		content.innerHTML = "";
		var boulder_create_div = HtmlHelpers.gen_boulder_create_div();
		content.innerHTML = boulder_create_div;

		CreateBoulder.initialize_create_boulder(reset);
		CreateBoulder.set_all_events();
	}

	/*
	 * HIDE & SEEK
	 */
	ns.show_picture_preview = function(){
		$('#js-picture_upload').hide();
		
		$('#js-picture_preview').removeClass('hidden');
		$('#js-picture_preview').show();
	}

	ns.show_picture_upload = function(){
		$('#js-picture_upload').show();
		$('#js-picture_preview').hide();
	}

	ns.show_progress_bar = function(){
		CreateBoulder.update_progress_bar('0%');
		$('#js-progress_div').removeClass('hidden');
		$('#js-progress_div').show();
	}

	ns.hide_progress_bar = function(){
		$('#js-progress_div').hide();
	}

	ns.show_message = function(str, type, milliseconds){
		var js_message_display = $('#js-message_display');
		set_message_type(js_message_display, type);
		
		js_message_display.children().html(str);
		js_message_display.removeClass('hidden');
		js_message_display.show();
		if(milliseconds != undefined){
			hide_message(milliseconds);
		}
	}

	function set_message_type(element, type){
		element.removeClass();
		element.addClass('row');
		element.addClass('dashed_border');
		if(type == 'success'){
			element.addClass('success_border');
		}else if(type == 'warning'){
			element.addClass('warning_border');
		}else if(type == 'error'){
			element.addClass('error_border');
		}
	}

	function hide_message(milliseconds){
		$('#js-message_display').delay(milliseconds).fadeOut();
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

