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
	var params = document.URL.split('#');
	if (params.length > 1){
		internal_redirect(params[1]);
	}
});

function internal_redirect(uri){

	var uri_parts = uri.split('/');
	
	if (uri_parts[0] == 'boulder'){
		console.log('redirection_to ', uri_parts[1]);
		ViewController.show_boulder(uri_parts[1]);
	}
}