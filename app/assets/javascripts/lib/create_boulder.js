"use strict";

var CreateBoulder = {};
(function(ns){

	var preview_angle = 0;
	var boulder_draft = null;

	ns.initialize_create_boulder = function(reset){

		if ( !has_draft() || reset == 'reset'){
			boulder_draft = new Boulder();
			preview_angle = 0;
		} else {
			CreateBoulder.load_draft_boulder();
		}
	}

	function has_draft(){
		return boulder_draft != null;
	}

	ns.load_draft_boulder = function(){
		if (boulder_draft.name != ""){
			$('#boulder_name').val(boulder_draft.name);
		}
		if (boulder_draft.loc != ""){
			$('#boulder_location').val(boulder_draft.loc);
		}

		if (boulder_draft.picture != ""){
			ns.display_preview_picture(boulder_draft.picture);
		}
	}

	ns.set_all_events = function(){
		set_upload_picture_events();
		set_tool_bar_events();
		set_change_input_events();
		set_send_button_event();
		set_geolocate_button_event();
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

	function set_change_input_events(){

		$('#boulder_name').blur(function(event){
			boulder_draft.name = $(this).val();
		})

		$('#boulder_location').blur(function(event){
			boulder_draft.loc = $(this).val();
		})

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
			picture_preview.removeClass();
			picture_preview.addClass("rotate" + preview_angle);
			picture_preview.className = "rotate" + preview_angle;
		});

		$('#js-rotate_left').click(function(){
			preview_angle = (preview_angle - 90) % 360;
			picture_preview.removeClass();
			picture_preview.addClass("rotate" + preview_angle);
		});

		$('#js-delete_picture').click(function(){
			ViewController.show_create_boulder('reset');
			console.log('DELETE!');
			// TODO send DELETE AJAX
		});
	}

	function set_send_button_event(){
		/* Send button */
		$('#js-send_boulder_form').click(function(event){
			event.preventDefault();

			if (boulder_draft.is_filled()){
				var fd = prepare_boulder_data();

				ViewController.show_progress_bar();
				API.post_form('boulder.api_boulder_create_path', fd, 
					onSuccess_boulder_sent, 
					onError_boulder_sent,
					onProgress_boulder_sent,
					onAbort_boulder_sent
				);
			} else {
				ViewController.show_message('What about you filling the stuff above?', 'warning', 10000);
			}
		});

	}

	function prepare_boulder_data(){
		var picture_preview = $('#picture_preview');
		var blob = PicLib.dataURItoBlob(picture_preview.prop('src'));
		var fd = new FormData()
		fd.append('picture', blob);
		fd.append('picture_angle', preview_angle);
		fd.append('boulder_name', boulder_draft.name);
		fd.append('boulder_loc', boulder_draft.loc);
		
		if (boulder_draft.has_coords()){
			fd.append('boulder_latitude', boulder_draft.latitude);
			fd.append('boulder_longitude', boulder_draft.longitude);
		}
		return fd;
	}

	function onSuccess_boulder_sent(response){
		boulder_draft.id = $.parseJSON(response.target.responseText).boulder_id;
		var msg = 'Boulder created! <a href="/#boulder/'+ boulder_draft.id +'">check it</a>';
		ViewController.show_message(msg, 'success');
		boulder_draft = null;
		$('#js-send_boulder_form').unbind('click');
	}

	function onError_boulder_sent(){
		alert("There was an error attempting to upload the boulder.");
	}

	function onProgress_boulder_sent(evt) {

		if (evt.lengthComputable) {
			var percentComplete = Math.round(evt.loaded * 100 / evt.total).toString() + '%';
			CreateBoulder.update_progress_bar(percentComplete);
		} else { 
			CreateBoulder.update_progress_bar('0% error uploading');
		}
	}
 
	function onAbort_boulder_sent(evt) {
		alert("The upload has been canceled by the user or the browser dropped the connection.");
	}

	function set_geolocate_button_event(){
		var js_geolocate_button = $('#js-geolocate_button');
		
		js_geolocate_button.click(function(event){
			event.preventDefault();
			js_geolocate_button.removeClass('btn-success');
			js_geolocate_button.addClass('btn-info');
			Geolocation.getGeoposition(geoSuccess, geoError, geoNotSupported);
		})

		function geoSuccess(position){
			js_geolocate_button.removeClass('btn-info');
			js_geolocate_button.addClass('btn-success');
			boulder_draft.latitude = position.coords.latitude;
			boulder_draft.longitude = position.coords.longitude;
			ViewController.show_message("I got yo coords!", 'success', 5000);
		}
		function geoError(){
			console.log('Error GPS');
		}
		function geoNotSupported(){
			console.log('Browser Error GPS');	
		}
	}

	ns.display_preview_picture = function(file){
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#picture_preview').attr('src', e.target.result);
		}

		if (file != null){
			reader.readAsDataURL(file);
			ViewController.show_picture_preview();
			var file_info = PicLib.get_file_info();
			display_image_info(file_info);
		}
	}

	function display_image_info(file_info){
		document.getElementById('details').innerHTML += 'Size: ' + file_info.size + '<br>Type: ' + file_info.type;
		document.getElementById('details').innerHTML += '<p>';
	}

	ns.update_progress_bar = function(progress){
		var pb = $('#js-progress_bar');
		pb.text(progress);
		pb.css('width', progress);
	}


}(CreateBoulder));