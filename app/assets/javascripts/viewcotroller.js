"use strict";

var ViewController = {};
(function(ns){

	var content = document.getElementById('content');

	var routes = {
		'site': {
			'site_index_path': 			'/'
		},
		'boulder': {
			'api_boulder_path': 		'/api/boulder',
			'api_boulder_read_path': 	'/api/boulder/',
			'api_boulder_create_path':	'/api/boulder/',
			'api_boulder_update_path':	'/api/boulder/',
			'api_boulder_delete_path':	'/api/boulder/',
		}	
	};

	ns.show_boulders = function(){
		API.get('boulder.api_boulder_path', ns.display_boulders)
	}
	
	ns.display_boulders = function(boulders){
		console.log("display_boulders: ", boulders);
		var boulder_list = document.createElement("ul");
		var boulders_len = boulders.length;
		for (var i = 0; i < boulders_len; i++) {
			var li = document.createElement("li");
			li.id = 'boulder_' + boulders[i].id;
			li.textContent = boulders[i].name;
			boulder_list.appendChild(li);
		};
		console.log(boulder_list);
		content.appendChild(boulder_list);
	}

}(ViewController));

/*
/* NAVIGATION CAPTURED EVENTS 
 */

$('.js-api_boulder_path').click(function(event){
	event.preventDefault();
    ViewController.show_boulders();
})