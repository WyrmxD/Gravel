"use strict";

var HtmlPrimitives = {};
(function(ns){

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
			var img = document.createElement("img");
			img.setAttribute('src', THUMBNAIL_PATH + items[i].picture);

			var li = ns.gen_list_item(items[i], id_prefix, item_class)
			li.insertBefore(img,li.firstChild);
			item_list.appendChild(li);
		};
		return item_list;
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

}(HtmlPrimitives));