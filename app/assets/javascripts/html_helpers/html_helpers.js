"use strict";

var HtmlHelpers = {};
(function(ns){

	ns.gen_boulder_grid = function(boulders, div_class){
		var boulder_div = HtmlPrimitives.gen_div('boulder_div', div_class);
		
		var boulder_list = HtmlPrimitives.gen_list(boulders, 'ul', 'boulder_');
		boulder_div.appendChild(boulder_list);
		return boulder_div;
	}

	ns.gen_boulder_create_div = function(){
		return boulder_create_div_tpl;
	}

}(HtmlHelpers));