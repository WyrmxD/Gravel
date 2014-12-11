"use strict";

var PicLib = {};
(function(ns){

	var resized_image;

	function getFileInfo(count, id){
		document.getElementById('details').innerHTML = "";
		for (var index = 0; index < count; index ++){

			var file = document.getElementById(id).files[index];
			var fileSize = 0;

			if (file.size > 1024 * 1024) {
				fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			} else {
				fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
			}

			document.getElementById('details').innerHTML += 'Name: ' + file.name + '<br>Size: ' + fileSize + '<br>Type: ' + file.type;
			document.getElementById('details').innerHTML += '<p>';
		}
		return file;
	}

	ns.fileSelected = function(){	 
		console.log('HOLA');
		var input = document.getElementById('fileToUpload');
		if(null !== input){
			var count = input.files.length;
		}
		if(count > 0){
			var file = getFileInfo(count, 'fileToUpload');
			ns.resizeFile(file);
		}
	}

	ns.pictureTaken = function(){
		var input = document.getElementById('pictureToUpload');
		if(null !== input){
			var count = input.files.length;
		}
		if(count > 0){
			file = getFileInfo(count, 'pictureToUpload')
			ns.resizeFile(file);
		}
	}


	ns.resizeFile = function(file) {
		var reader = new FileReader();
	    reader.onloadend = function() {
	 
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function() {
		 
				var MAX_WIDTH = 800;
				var MAX_HEIGHT = 600;
				var tempW = tempImg.width;
				var tempH = tempImg.height;
				if (tempW > tempH) {
				    if (tempW > MAX_WIDTH) {
				       tempH *= MAX_WIDTH / tempW;
				       tempW = MAX_WIDTH;
				    }
				} else {
				    if (tempH > MAX_HEIGHT) {
				       tempW *= MAX_HEIGHT / tempH;
				       tempH = MAX_HEIGHT;
				    }
				}

				var canvas = document.createElement('canvas');
				canvas.width = tempW;
				canvas.height = tempH;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(this, 0, 0, tempW, tempH);
				var dataURL = canvas.toDataURL("image/jpeg");

				var data = 'image=' + dataURL;
				var fd = new FormData()
				var blob = dataURItoBlob(dataURL);
				fd.append("picture", blob);
				previewPicture(blob);
				fd.append("boulder_id", getBoulderId());

				//uploadFile(fd)
			}
		}
	   reader.readAsDataURL(file);
	}

	function getBoulderId(){
		return $('form[id^="edit_boulder"]').prop('id')
	}

	function dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
		    byteString = atob(dataURI.split(',')[1]);
		else
		    byteString = unescape(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
		    ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], {type:mimeString});
	}
 
	function uploadFile(fd) {
 
		var xhr = new XMLHttpRequest(); 
		xhr.upload.addEventListener("progress", uploadProgress, false); 
		xhr.addEventListener("load", uploadComplete, false); 
		xhr.addEventListener("error", uploadFailed, false); 
		xhr.addEventListener("abort", uploadCanceled, false); 
		xhr.open("POST", "/api/boulder", true);

		xhr.send(fd); 
	}

	function previewPicture(file){
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#picture_preview').attr('src', e.target.result);
		}

		reader.readAsDataURL(file);
		ViewController.show_picture_preview();
	}

 
	function uploadProgress(evt) {

		if (evt.lengthComputable) {
			var percentComplete = Math.round(evt.loaded * 100 / evt.total);
			document.getElementById('progress').innerHTML = percentComplete.toString() + '%';
		} else { 
			document.getElementById('progress').innerHTML = 'unable to compute';
		}
	}
 
	function uploadComplete(evt) {

		/* This event is raised when the server send back a response */ 
		alert(evt.target.responseText);

	}
 
	function uploadFailed(evt) { 
		alert("There was an error attempting to upload the file.");
	}
 
	function uploadCanceled(evt) {
		alert("The upload has been canceled by the user or the browser dropped the connection.");
	}


}(PicLib));