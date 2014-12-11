var boulder_create_div_tpl = '\
<div id="js-picture_upload" class="row">\
	<div class="col-xs-6 col-sm-3 col-md-2">\
		<div class="icon_big">\
		<span class="glyphicon glyphicon-camera icon_big background_color" aria-hidden="true" id="camera_picture"></span>\
		</div>\
	</div>\
	<div class="col-xs-6 col-sm-3 col-md-2">\
		<div class="icon_big">\
			<span class="glyphicon glyphicon-folder-open icon_big background_color" aria-hidden="true" id="local_picture"></span>\
		</div>\
	</div>\
</div>\
<div id="js-picture_preview" class="row picture_preview hidden">\
	<div class="col-xs-6 col-sm-3 col-md-2">\
		<img id="picture_preview" src="" >\
	</div>\
	<div class="col-xs-6 col-sm-3 col-md-2">\
		<div class="row">\
			<div class="col-xs-12">\
				<div id="details"></div>\
				<div id="progress"></div>\
			</div>\
		</div>\
		<div class="row">\
			<div class="col-xs-4">\
				<span class="glyphicon glyphicon-repeat icon_medium link_color" aria-hidden="true" id="local_picture"></span>\
			</div>\
			<div class="col-xs-4">\
				<span class="glyphicon glyphicon-repeat icon_medium rotated link_color" aria-hidden="true" id="local_picture"></span>\
			</div>\
			<div class="col-xs-4">\
				<span class="glyphicon glyphicon-trash icon_medium link_color" aria-hidden="true" id="local_picture"></span>\
			</div>\
		</div>\
	</div>\
</div>\
\
<div class="row">\
	<div class="col-xs-12 col-sm-6">\
		<form role="form" accept-charset="UTF-8" action="#" class="edit_boulder" data-remote="true" enctype="multipart/form-data" id="edit_boulder_89" method="post">\
			<input accept="image/*" capture="camera" class="hidden" id="pictureToUpload" name="boulder[picture]" onchange="pictureTaken();" type="file"><br>\
			<input accept="image/*" class="hidden" id="fileToUpload" name="boulder[picture]" type="file"><br>\
			<div class="form-group">\
				<label for="boulder_name">Name</label>\
				<input type="text" class="form-control" id="boulder_name" placeholder="Boulder name">\
			</div>\
		</form>\
	</div>\
</div>';
