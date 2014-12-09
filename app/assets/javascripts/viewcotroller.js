"use strict";

var ViewController = {};
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

	ns.get_boulders = function(){

		function success_get_boulders(data){
			console.log(data)
		}
		API.get('boulder.api_boulder_path', success_get_boulders)

	}

	function error(data){
		console.log('Error retrieving boulders', data)
	}

	ns.load = function(method, uri){
		console.log(uri);
		
		$.ajax({
			url: uri,
			type: method,
			success: success,
			error: error,
			complete: complete
		})

		function success(data){
			console.log(data)
			var api_action = data[0].api_action
			if(api_action == 'api_boulder_path'){
				console.log("{api_action: 'api_boulder_path'}")
			}
		}

		function error(data){
			console.log("error")
		}

		function complete(data){
			console.log("complete")
		}		
	}

}(ViewController));




$('.js-api_boulder_path').click(function(event){
	event.preventDefault();
    ViewController.get_boulders();
})