"use strict";

var ViewController = {};
(function(ns){

	/* APP Status */
	var boulders_stored;
	var new_image;

	/* HTML Elements */
	var content = document.getElementById('content');

	/*
	 * Boulders List
	 */
	ns.show_boulders = function(uri){
		API.get('boulder.api_boulder_path', ns.display_boulders, get_offset_limit(uri));
	}
	
	ns.display_boulders = function(boulders){
		boulders_stored = boulders;
		content.innerHTML = "";
		var boulder_div = HtmlHelpers.gen_boulder_grid(boulders_stored);
		content.appendChild(boulder_div);
	}

	function get_offset_limit(uri){
		var params = uri.split('/');
		return params[1];
	}

	/*
	 * Read Boulder
	 */
	ns.show_boulder = function(boulder_id){
		API.get('boulder.api_boulder_read_path', ns.display_boulder, boulder_id)
	}

	ns.display_boulder = function(boulder){
		clean_content();
		var boulder_read_div = HtmlHelpers.gen_boulder_read_div();
		content.innerHTML = boulder_read_div;

		ReadBoulder.load_boulder(boulder);
	}

	/*
	 * New Boulder 
	 */
	ns.show_create_boulder = function(reset){
		clean_content();
		var boulder_create_div = HtmlHelpers.gen_boulder_create_div();
		content.innerHTML = boulder_create_div;

		CreateBoulder.initialize_create_boulder(reset);
		CreateBoulder.set_all_events();
	}

	/*
	 * Edit Boulder
	 */
	ns.show_edit_boulder = function(boulder){
		var boulder_picture = $('#boulder_picture').clone();
		clean_content();
		boulder_picture.prop('width', '100%');
		boulder_picture.prop('display', 'hidden');
		var boulder_edit_div = HtmlHelpers.gen_boulder_edit_div(boulder_picture);
		content.innerHTML = boulder_edit_div;
		$('.boulder_read_name').append(boulder.name);
		$('.boulder_read_location').append(boulder.location);
		$('#boulder_picture_col').prepend(boulder_picture);

		EditBoulder.initialize_edit_boulder(boulder);
	}

	/*
	 * HIDE & SEEK
	 */

	function clean_content(){
		content.innerHTML = "";
	}

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
			console.log('hide?', milliseconds != undefined);
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
		if (milliseconds != undefined) {
			$('#js-message_display').delay(milliseconds).fadeOut();
		}
	}

}(ViewController));

