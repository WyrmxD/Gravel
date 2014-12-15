"use strict";

var HtmlHelpers = {};
(function(ns){

	ns.gen_boulder_grid = function(boulders, div_class){
		var boulder_div = HtmlPrimitives.gen_div('boulder_div', div_class);
		var boulder_array = HtmlPrimitives.gen_boulder_array(boulders);
		var i;
		var boulders_len = boulder_array.length;
		for(i = 0; i < boulders_len; i++){
			$(boulder_div).append(boulder_array[i]);
		}
		return boulder_div;
	}

	ns.gen_boulder_create_div = function(){
		return boulder_create_div_tpl;
	}

	ns.gen_boulder_read_div = function(){
		return boulder_read_div_tpl;
	}

}(HtmlHelpers));