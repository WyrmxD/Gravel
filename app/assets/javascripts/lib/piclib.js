"use strict";

var PicLib = {};
(function(ns){

	var url_post_pic = "/api/boulder";
	// var resized_image;
	var file_info;

	ns.get_file_info = function(){
		return file_info;
	}

	ns.fileSelected = function(input_id, callback){	 
		var input = document.getElementById(input_id);
		if(null !== input){
			var count = input.files.length;
		}
		if(count > 0){
			var file = document.getElementById(input_id).files[0];
			ns.resizeFile(file, callback);
		}
	}

	ns.resizeFile = function(file, callback) {
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

				var resized_image = ns.dataURItoBlob(dataURL);
				file_info = getFileInfo(resized_image);
				CreateBoulder.display_preview_picture(resized_image);
				callback(resized_image);
			}
		}
		reader.readAsDataURL(file);
	}

	function getFileInfo(file){
		var fileSize = 0;

		if (file.size > 1024 * 1024) {
			fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
		} else {
			fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
		}

		return {size: fileSize, type: file.type};
	}

	function getBoulderId(){
		return $('form[id^="edit_boulder"]').prop('id')
	}

	ns.dataURItoBlob = function(dataURI) {
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
		xhr.open("POST", url_post_pic, true);

		xhr.send(fd); 
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