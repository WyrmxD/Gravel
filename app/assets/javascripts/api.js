"use strict";

var API = {};
(function(ns){

	var routes = {
		'boulder': {
			'api_boulder_path': 		'/api/boulder',
			'api_boulder_create_path':	'/api/boulder',
			'api_boulder_read_path': 	'/api/boulder/',	// :id
			'api_boulder_update_path':	'/api/boulder/',	// :id
			'api_boulder_delete_path':	'/api/boulder/',	// :id
		}	
	};

	ns.get = function(path, callback){
		var path_params = path.split(".");
		$.ajax({
			type: 'get',
			url: routes[path_params[0]][path_params[1]],
			success: callback,
			error: error
		})

		function error(data){
			console.log("error GET ", data);
		}
	}

	ns.post = function(path, data, callback){
		var path_params = path.split(".");
		$.ajax({
			type: 'post',
			url: routes[path_params[0]][path_params[1]],
			data: data,
			success: callback,
			error: error
		})

		function error(data){
			console.log("error POST ", data);
		}
	}

	ns.post_form = function(path, form_data, callback){
		var xhr = new XMLHttpRequest(); 
		xhr.upload.addEventListener("progress", uploadProgress, false); 
		xhr.addEventListener("load", callback, false); 
		xhr.addEventListener("error", uploadFailed, false); 
		xhr.addEventListener("abort", uploadCanceled, false); 
		xhr.open("POST", "/api/boulder", true);

		xhr.send(form_data);
	}

	function uploadProgress(evt) {

		var pb = $('#js-progress_bar');
		if (evt.lengthComputable) {
			var percentComplete = Math.round(evt.loaded * 100 / evt.total).toString() + '%';
			pb.text(percentComplete);
			pb.css('width', percentComplete);

			//document.getElementById('progress').innerHTML = percentComplete.toString() + '%';
		} else { 
			pb.innerHTML = '0% error uploading';
			//document.getElementById('progress').innerHTML = 'unable to compute';
		}
	}
 
	function uploadComplete(evt) {

		/* This event is raised when the server send back a response */ 
		alert(evt.target.responseText);

	}
 
	function uploadFailed(evt) { 
		alert("There was an error attempting to upload the file.");
	}
 
	function uploadCanceled(evt) {
		alert("The upload has been canceled by the user or the browser dropped the connection.");
	}

}(API));

