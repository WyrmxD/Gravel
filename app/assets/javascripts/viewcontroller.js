"use strict";

var ViewController = {};
(function(ns){

	/* APP Status */
	var boulders_stored;
	var preview_angle = 0;

	/* HTML Elements */
	var content = document.getElementById('content');
	var file_input = 'js-file_input';
	var picture_input = 'js-picture_input';

	/* Boulders */
	ns.show_boulders = function(){
		API.get('boulder.api_boulder_path', ns.display_boulders);
	}
	
	ns.display_boulders = function(boulders){
		boulders_stored = boulders;
		content.innerHTML = "";
		var boulder_div = HtmlHelpers.gen_boulder_grid(boulders_stored);
		content.appendChild(boulder_div);
	}

	/* New Boulder */
	ns.show_create_boulder = function(){
		content.innerHTML = "";
		var boulder_create_div = HtmlHelpers.gen_boulder_create_div();
		content.innerHTML = boulder_create_div;
		preview_angle = preview_angle || 0;

		/* Events Upload Picture */
		$('#camera_picture').on('click', function() {
			$('#js-picture_input').trigger('click');
		});

		$('#local_picture').on('click', function() {
			$('#js-file_input').trigger('click');
		});

		$('#js-picture_input').change(function(event){
			event.preventDefault();
			PicLib.fileSelected(picture_input);
		});

		$('#js-file_input').change(function(event){
			event.preventDefault();
			PicLib.fileSelected(file_input);
		});

		/* Send button */
		$('#js-send_boulder_form').click(function(event){
			event.preventDefault();
			var img = $('#picture_preview');
			
			var blob = PicLib.dataURItoBlob(img.prop('src'));
			var fd = new FormData()
			fd.append('picture', blob);
			fd.append('picture_angle', preview_angle);

			ns.show_progress_bar();
			API.post_form('boulder.api_boulder_create_path', fd, suc);
		});

		/* Events Rotate & Delete pic */
		var picture_preview = $('#picture_preview');
		$('#js-rotate_right').click(function(){
			preview_angle = (preview_angle + 90) % 360;
			picture_preview.className = "rotate" + preview_angle;
			console.log('RIGHT!', preview_angle);
		});

		$('#js-rotate_left').click(function(){
			preview_angle = (preview_angle + (360- 90)) % 360;
			picture_preview.className = "rotate" + preview_angle;
			console.log('LEFT!', preview_angle);
		});

		$('#js-delete_picture').click(function(){
			preview_angle = 0;
			ns.show_picture_upload();
			console.log('DELETE!');
			// TODO send DELETE AJAX
		});

		function suc(){
			console.log('OK');
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

