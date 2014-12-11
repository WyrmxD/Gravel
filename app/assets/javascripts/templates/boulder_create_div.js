var boulder_create_div_tpl = '\
<div class="row">\
	<div class="col-xs-6 col-md-9">\
		<div class="icon_big">\
		<span class="glyphicon glyphicon-camera icon_big" aria-hidden="true" id="camera_picture"></span>\
		</div>\
	</div>\
	<div class="col-xs-6 col-md-9">\
		<div class="icon_big">\
			<span class="glyphicon glyphicon-folder-open icon_big" aria-hidden="true" id="local_picture"></span>\
		</div>\
	</div>\
</div>\
\
<form accept-charset="UTF-8" action="#" class="edit_boulder" data-remote="true" enctype="multipart/form-data" id="edit_boulder_89" method="post">\
	<input accept="image/*" capture="camera" class="hidden" id="pictureToUpload" name="boulder[picture]" onchange="pictureTaken();" type="file"><br>\
	<input accept="image/*" class="hidden" id="fileToUpload" name="boulder[picture]" onchange="fileSelected();" type="file"><br>\
</form>\
\
<div id="details"></div>\
<div id="progress"></div>\
';
