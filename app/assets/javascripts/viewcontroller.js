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
		$('#boulder_picture_col').prepend(boulder_picture);


		var PICTURE_PATH = "uploads/"
		var THUMBNAIL_PATH = "uploads/thumbs/"
		var circles = []

		var url = PICTURE_PATH + boulder.picture;
		fabric.Image.fromURL(url, function(oImg) {
			var width = $('#boulder_picture').width();
			var height = $('#boulder_picture').height();
			console.log(width, height);
			
			$('#boulder_picture').remove();
			$('#canvas').prop('width', width);
			$('#canvas').prop('height', height);
			$('#canvas').removeAttr('visibility');
			var canvas = new fabric.Canvas("canvas");
			oImg.set({
				width: width,
				height: height,
				originX: 'left',
				originY: 'top'
			});
			canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));

			canvas.on('mouse:down', function(options) {
				var Y_coord = options.e.clientY - $('#canvas').offset().top;
				var X_coord = options.e.clientX - $('#canvas').offset().left;

				console.log(X_coord, Y_coord);
				if (options.target) {
					console.log('an object was clicked! ', options.target.type);
				} else {
					if ( valid_coords(X_coord, Y_coord)){
						addCircle(canvas, 'red', X_coord, Y_coord);
						storeNode(X_coord, Y_coord);
					}
				}
			});
		});
		
		
		function valid_coords(X, Y){
			return !isNaN(X) && !isNaN(Y);
		}

		function addCircle(canvas, color, X, Y){
			var circle = new fabric.Circle({
				selectable: true,
				opacity: 0.5,
				radius: 15, 
				hasControls: false, 
				fill: color, 
				left: X-15, 
				top: Y-15
			});
			canvas.add(circle);
		}

		function storeNode(x,y){
			circles.push({x:x, y:y});
		}


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

