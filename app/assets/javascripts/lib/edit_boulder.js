"use strict";

var EditBoulder = {};
(function(ns){

	var PICTURE_PATH = "uploads/"
	var THUMBNAIL_PATH = "uploads/thumbs/"
	var boulder;
	var circles = []

	ns.initialize_edit_boulder = function(myBoulder){
		boulder = myBoulder;
		ns.load_image();

		// TODO check existent circles
	}

	ns.load_image = function(){
		var url = PICTURE_PATH + boulder.picture;
		fabric.Image.fromURL(url, function(oImg) {
			var width = $('#boulder_picture').width();
			var height = $('#boulder_picture').height();
			console.log(width, height);

			prepare_canvas(oImg, width, height);
		});		
	}

	function prepare_canvas(oImg, width, height){
		var canvas = create_canvas(width, height);
		embed_image(canvas, oImg, width, height);

		set_canvas_mouse_events(canvas);
		set_canvas_resize_window_event(canvas);
	}

	function create_canvas(width, height){
		$('#boulder_picture').css('display','none');
		$('#canvas').prop('width', width);
		$('#canvas').prop('height', height);
		$('#canvas').show();
		
		var canvas = new fabric.Canvas("canvas", {
			selection: false
		});
		return canvas;
	}

	function embed_image(canvas, oImg, width, height){
		oImg.set({
			width: width,
			height: height,
			originX: 'left',
			originY: 'top'
		});
		canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));
	}

	function set_canvas_mouse_events(canvas){
		canvas.on('mouse:down', function(options) {
			var Y_coord = options.e.clientY - $('#canvas').offset().top;
			var X_coord = options.e.clientX - $('#canvas').offset().left;

			console.log(X_coord, Y_coord);
			if (options.target) {
				console.log('an object was clicked! ', options.target.left);
			} else {
				if ( valid_coords(X_coord, Y_coord)){
					addCircle(canvas, 'red', X_coord, Y_coord);
					storeNode(X_coord, Y_coord);
				}
			}
		});
	}

	function set_canvas_resize_window_event(canvas){
		$(window).unbind('resize');
		$(window).resize(function(){ 
			console.log('resized');
			canvas.dispose();
			// $('#canvas').hide();
			$('#boulder_picture').css('display','block');
			$('#boulder_picture').css('visibility','visible');
			var boulder_picture = $('#boulder_picture').clone();
			replace_canvas();

			ns.load_image();

		});
	}

	function replace_canvas(){
		$('#canvas_container').empty();
		var new_canvas = document.createElement('CANVAS');
		new_canvas.id = 'canvas';
		$(new_canvas).addClass('picture_canvas');
		$(new_canvas).hide();
		$('#canvas_container').append(new_canvas);
	}
	
	
	function valid_coords(X, Y){
		return !isNaN(X) && !isNaN(Y);
	}

	function addCircle(canvas, color, X, Y){
		var circle = new fabric.Circle({
			selectable: true,
			opacity: 0.5,
			radius: 15, 
			hasControls: false, 
			fill: color, 
			left: X-15, 
			top: Y-15
		});
		circle.on('modified', function() {
			var modified_circles = canvas.getObjects();
			var i;
			var len = modified_circles.length;
			circles = [];
			for(i=0; i < len; i++){
				storeNode(modified_circles[i].left, modified_circles[i].top);
			}
			console.log(modified_circles);
		});
		canvas.add(circle);
	}

	function storeNode(x,y){
		circles.push({x:x, y:y});
	}

}(EditBoulder));