"use strict";

var ViewController = {};
(function(ns){

	var file_input = 'js-file_input';
	var picture_input = 'js-picture_input';

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

		/* Captured Events */
		$('#camera_picture').on('click', function() {
			$('#js-picture_input').trigger('click');
		});

		$('#local_picture').on('click', function() {
			$('#js-file_input').trigger('click');
		});

		$('#js-picture_input').change(function(event){
			event.preventDefault();
			PicLib.fileSelected(picture_input);
		})

		$('#js-file_input').change(function(event){
			event.preventDefault();
			PicLib.fileSelected(file_input);
		})

		$('#js-send_boulder_form').click(function(event){
			event.preventDefault();
			var img = $('#picture_preview');
			
			var blob = PicLib.dataURItoBlob(img.prop('src'));
			var fd = new FormData()
			fd.append('picture', blob);

			API.post_form('boulder.api_boulder_create_path', fd, suc);
		})

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

