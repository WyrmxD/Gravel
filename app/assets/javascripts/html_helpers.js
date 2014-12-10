"use strict";

var HtmlHelpers = {};
(function(ns){

	ns.gen_boulder_grid = function(boulders, div_class){
		var boulder_list = ns.gen_list(boulders, 'ul', 'boulder_');
		var boulder_div = document.createElement('div');
		boulder_div.id = 'boulder_list';
		if(typeof(div_class) !== 'undefined'){
			boulder_div.setAttribute('class', div_class);
		}
		boulder_div.appendChild(boulder_list);
		return boulder_div;
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
			img.setAttribute('src', items[i].picture);

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

}(HtmlHelpers));