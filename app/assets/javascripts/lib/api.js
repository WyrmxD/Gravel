"use strict";

var API = {};
(function(ns){

	var base_url = window.location.origin;
	var routes = {
		'boulder': {
			'api_boulder_path': 		'/api/boulder',
			'api_boulder_create_path':	'/api/boulder',
			'api_boulder_read_path': 	'/api/boulder/',	// :id
			'api_boulder_update_path':	'/api/boulder/',	// :id
			'api_boulder_delete_path':	'/api/boulder/',	// :id
		}	
	};

	ns.get = function(path, onSuccess, onError, get_params){
		var path_params = path.split(".");
		var url_get = base_url + routes[path_params[0]][path_params[1]];
		if (get_params != undefined){
			url_get += get_params;
		}
		$.ajax({
			type: 'get',
			url: url_get,
			success: onSuccess,
			error: onError
		});
	}

	ns.post = function(path, data, onSuccess, onError){
		var path_params = path.split(".");
		$.ajax({
			type: 'post',
			url: routes[path_params[0]][path_params[1]],
			data: data,
			success: onSuccess,
			error: onError
		});
	}

	ns.post_form = function(path, form_data, onSuccess, onError, onProgress, onAbort){
		var xhr = new XMLHttpRequest(); 
		xhr.addEventListener("load", onSuccess, false); 
		xhr.addEventListener("error", onError, false); 
		xhr.upload.addEventListener("progress", onProgress, false); 
		xhr.addEventListener("abort", onAbort, false); 
		xhr.open("POST", "/api/boulder", true);

		xhr.send(form_data);
	}

}(API));

