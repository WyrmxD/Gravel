"use strict";

var ViewController = {};
(function(ns){

	/* APP Status */
	var boulders_stored;
	var preview_angle = 0;
	var boulder_draft = null;
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

		if(boulder_draft == null || reset == 'reset'){
			initialize_create_boulder();
		}else{
			// TODO Load draft boulder into view
		}

		Geolocation.getGeoposition();
		set_upload_picture_events();
		set_tool_bar_events();
		set_send_button_event();
	}

	function initialize_create_boulder(){
		boulder_draft = new Boulder();
		preview_angle = 0;
	}

	function set_upload_picture_events(){
		var js_picture_input = $('#js-picture_input');
		var js_file_input = $('#js-file_input');

		/* Events Upload Picture */
		$('#camera_picture').on('click', function() {
			js_picture_input.trigger('click');
		});

		$('#local_picture').on('click', function() {
			js_file_input.trigger('click');
		});

		set_input_events();
	}

	function set_input_events(){
		var picture_input = 'js-picture_input';
		var file_input = 'js-file_input';

		$('#js-picture_input').change(function(event){
			event.preventDefault();
			PicLib.fileSelected(picture_input, set_boulder_pic);
		});

		$('#js-file_input').change(function(event){
			event.preventDefault();
			PicLib.fileSelected(file_input, set_boulder_pic);
		});
	}

	function set_boulder_pic(image_blob){
		boulder_draft.picture = image_blob;
	}

	function set_tool_bar_events(){
		/* Events Rotate & Delete pic */
		var picture_preview = $('#picture_preview');
		$('#js-rotate_right').click(function(){
			preview_angle = (preview_angle + 90) % 360;
			picture_preview.className = "rotate" + preview_angle;
			console.log('RIGHT!', preview_angle);
		});

		$('#js-rotate_left').click(function(){
			preview_angle = (preview_angle - 90) % 360;
			picture_preview.className = "rotate" + preview_angle;
			console.log('LEFT!', preview_angle);
		});

		$('#js-delete_picture').click(function(){
			ns.show_create_boulder('reset');
			console.log('DELETE!');
			// TODO send DELETE AJAX
		});
	}

	function set_send_button_event(){

		/* Send button */
		var picture_preview = $('#picture_preview');
		$('#js-send_boulder_form').click(function(event){
			event.preventDefault();
			
			var blob = PicLib.dataURItoBlob(picture_preview.prop('src'));
			var fd = new FormData()
			fd.append('picture', blob);
			fd.append('picture_angle', preview_angle);
			if(boulder_draft != null){
				fd.append('boulder_name', boulder_draft.name);				
			}
			console.log('boulder_draft.name', boulder_draft.name);
			console.log('boulder_draft.picture', boulder_draft.picture);

			ns.show_progress_bar();
			API.post_form('boulder.api_boulder_create_path', fd, success);
		});

		function success(response){
			boulder_draft.id = $.parseJSON(response.target.responseText).boulder_id;
		}
	}

	ns.display_preview_picture = function(file){
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#picture_preview').attr('src', e.target.result);
		}

		reader.readAsDataURL(file);
		ns.show_picture_preview();
		var file_info = PicLib.get_file_info();
		ns.display_image_info(file_info);
	}

	ns.display_image_info = function(file_info){
		document.getElementById('details').innerHTML += 'Size: ' + file_info.size + '<br>Type: ' + file_info.type;
		document.getElementById('details').innerHTML += '<p>';
	}

	ns.update_progress_bar = function(progress){
		var pb = $('#js-progress_bar');
		pb.text(progress);
		pb.css('width', progress);
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
		ns.update_progress_bar('0%');
		$('#js-progress_div').removeClass('hidden');
		$('#js-progress_div').show();
	}

	ns.hide_progress_bar = function(){
		$('#js-progress_div').hide();
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

