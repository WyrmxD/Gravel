"use strict";

var API = {};
(function(ns){

	var routes = {
		'boulder': {
			'api_boulder_path': 		'/api/boulder',
			'api_boulder_read_path': 	'/api/boulder/',
			'api_boulder_create_path':	'/api/boulder/',
			'api_boulder_update_path':	'/api/boulder/',
			'api_boulder_delete_path':	'/api/boulder/',
		}	
	};

	ns.get = function(path, callback){
		$.ajax({
			url: routes[path],
			type: 'get',
			success: success,
			error: error
		})

		function success(data){
			console.log("data");
		}

		function error(data){
			console.log("error");
		}
	}
}(API));