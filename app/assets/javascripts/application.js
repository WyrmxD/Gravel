// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

"use strict";

function check_landing_url(){
	var params = document.URL.split('#');
	if (params.length > 1){
		internal_redirect(params[1]);
	}
};

check_landing_url();

$(window).bind('hashchange', function() {
	check_landing_url();
});

function internal_redirect(uri){

	if (go_to_boulders(uri)){
		// #boulders
		ViewController.show_boulders(uri);
	} else if (go_to_new(uri)){
		// #boulder
		ViewController.show_create_boulder();
	}else if (go_to_boulder(uri)){
		// #boulder/:id
		var uri_parts = uri.split('/');
		ViewController.show_boulder(uri_parts[1]);
	}
}

function go_to_boulders(route){
	return route.substring(0,8) == 'boulders';
}

function go_to_new(route){
	return route == 'boulder';
}

function go_to_boulder(route){
	return route.substring(0,7) == 'boulder' && route.length > 7;
}