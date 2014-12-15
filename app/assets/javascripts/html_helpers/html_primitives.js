"use strict";

var HtmlPrimitives = {};
(function(ns){

	var URL_BOULDER = "boulder/"
	var PICTURE_PATH = "uploads/";
	var THUMBNAIL_PATH = "uploads/thumbs/";

	ns.gen_div = function(id, div_class){
		var div = document.createElement('div');
		if(typeof(id) !== 'undefined'){
			div.id = id
		}
		if(typeof(div_class) !== 'undefined'){
			div.setAttribute('class', div_class);
		}
		return div
	}

	ns.gen_list = function(items, list_type, id_prefix, list_class, item_class){
		var item_list = document.createElement(list_type);
		if(typeof(list_class) !== 'undefined'){
			item_list.setAttribute('class', item_class);
		}
		var i;
		var items_len = items.length;
		for (i = 0; i < items_len; i++) {
			var boulder_object = build_boulder_object(items[i]);
			$(item_list).append(boulder_object);
		};
		return item_list;
	}

	ns.gen_boulder_array = function(items){
		var item_list = [];
		var i;
		var items_len = items.length;
		for (i = 0; i < items_len; i++) {
			var boulder_object = build_boulder_object(items[i]);
			item_list.push(boulder_object);
		};
		return item_list;	
	}

	function build_boulder_object(boulder){
		var boulder_object = $(boulder_object_tpl);
		var a_element = boulder_object.children('a');
		var bd_element = boulder_object.children('.bd');

		boulder_object.prop('id', 'boulder_' + boulder.id)
		var boulder_link = '#' +URL_BOULDER + boulder.id;
		a_element.prop('href', boulder_link);
		a_element.children('img').prop('src', THUMBNAIL_PATH + boulder.picture);
		bd_element.append('<p class="boulder_name"><a href="'+boulder_link+'" class="js-boulder_link">'+ boulder.name +'</a></p>');
		bd_element.append('<p class="boulder_created">'+ boulder.created_at +'</p>');
		bd_element.append('<p class="boulder_location">'+ boulder.location +'</p>');
		return boulder_object;
	}

	ns.gen_list_item = function(item, id_prefix, item_class){
		var li = document.createElement("li");
		li.id = id_prefix + item.id;
		li.textContent = item.name;
		
		if(typeof(item_class) !== 'undefined'){
			li.setAttribute('class', item_class);
		}
		return li;
	}

	ns.gen_row = function(){
		var row = ns.gen_div(undefined, 'row');
		return row;
	}

	ns.gen_col = function(col_class){
		var col = ns.gen_div(undefined, col_class);
		return col;	
	}

	ns.gen_boulder = function(boulder){
		var boulder_object = $(boulder_object_tpl);
	}

}(HtmlPrimitives));