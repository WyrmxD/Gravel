"use strict";

var API = {};
(function(ns){

	var routes = {
		'boulder': {
			'api_boulder_path': 		'/api/boulder',
			'api_boulder_read_path': 	'/api/boulder/',	// :id
			'api_boulder_create_path':	'/api/boulder/',	// :id
			'api_boulder_update_path':	'/api/boulder/',	// :id
			'api_boulder_delete_path':	'/api/boulder/',	// :id
		}	
	};

	ns.get = function(path, callback){
		var path_params = path.split(".");
		$.ajax({
			url: routes[path_params[0]][path_params[1]],
			type: 'get',
			success: callback,
			error: error
		})

		function error(data){
			console.log("error GET ", data);
		}
	}
}(API));

