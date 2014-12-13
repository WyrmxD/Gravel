var boulder_create_div_tpl = '\
<div id="js-picture_upload" class="row">\
	<div id="camera_picture" class="col-xs-6 col-sm-3 col-md-2">\
		<div class="icon_big">\
		<span class="glyphicon glyphicon-camera icon_big background_color" aria-hidden="true"></span>\
		</div>\
	</div>\
	<div id="local_picture" class="col-xs-6 col-sm-3 col-md-2">\
		<div class="icon_big">\
			<span class="glyphicon glyphicon-folder-open icon_big background_color" aria-hidden="true"></span>\
		</div>\
	</div>\
</div>\
<div id="js-picture_preview" class="row dashed_border hidden">\
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
				<span class="glyphicon glyphicon-repeat icon_medium link_color" aria-hidden="true" id="js-rotate_right"></span>\
			</div>\
			<div class="col-xs-4">\
				<span class="glyphicon glyphicon-repeat icon_medium rotated link_color" aria-hidden="true" id="js-rotate_left"></span>\
			</div>\
			<div class="col-xs-4">\
				<span class="glyphicon glyphicon-trash icon_medium link_color" aria-hidden="true" id="js-delete_picture"></span>\
			</div>\
		</div>\
	</div>\
</div>\
\
<div class="row">\
	<div class="col-xs-12 col-sm-6">\
		<form id="boulder_form" role="form" accept-charset="UTF-8" action="#" class="edit_boulder" data-remote="true" enctype="multipart/form-data" method="post">\
			<input accept="image/*" capture="camera" class="hidden" id="js-picture_input" name="boulder_picture" type="file">\
			<input accept="image/*" class="hidden" id="js-file_input" name="boulder[picture]" type="file">\
			<div class="form-group">\
				<label for="boulder_name">Name</label>\
				<input type="text" class="form-control" id="boulder_name" placeholder="Boulder name">\
			</div>\
			<div class="form-group">\
				<label for="boulder_location">Location</label>\
				<input type="text" class="form-control" id="boulder_location" placeholder="Where is it?">\
			</div>\
		</form>\
	</div>\
</div>\
\
<div class="row">\
	<div class="col-xs-3 col-sm-1">\
		<button id="js-send_boulder_form" class="btn btn-success">Send</button>\
	</div>\
	<div class="col-xs-3 col-sm-1">\
		<button id="js-geolocate_button" class="btn">\
			<span class="glyphicon glyphicon-globe icon_small" aria-hidden="true" id="js-delete_picture"></span>\
		</button>\
	</div>\
	<div id="js-progress_div" class="col-xs-6 col-sm-6 progress_div hidden">\
		<div class="progress">\
			<div id="js-progress_bar" class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">\
				0%\
			</div>\
		</div>\
	</div>\
</div>\
<div id="js-message_display" class="row dashed_border hidden">\
	<div class="col-xs-12">\
	</div>\
</div>\
';
