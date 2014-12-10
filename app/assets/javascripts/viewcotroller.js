"use strict";

var ViewController = {};
(function(ns){

	var content = document.getElementById('content');
	var boulders_stored;

	ns.show_boulders = function(){
		API.get('boulder.api_boulder_path', ns.display_boulders);
	}
	
	ns.display_boulders = function(boulders){
		boulders_stored = boulders;
		content.innerHTML = "";
		var boulder_div = HtmlHelpers.gen_boulder_grid(boulders_stored)
		content.appendChild(boulder_div);
	}

	ns.show_boulder = function(){
		API.get('boulder.api_boulder_read_path', ns.display_boulder)
	}

	ns.display_boulder = function(){
		content.innerHTML = "";
	}

}(ViewController));


/*
/* NAVIGATION CAPTURED EVENTS 
 */

$('.js-api_boulder_path').click(function(event){
	event.preventDefault();
	ViewController.show_boulders();
})

$('.js-api_boulder_path').click(function(event){
	event.preventDefault();
	ViewController.show_boulders();
})