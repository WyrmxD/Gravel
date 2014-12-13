"use strict";

function Boulder(){

	this.id = 0;
	this.name = "";
	this.picture = null;
	this.loc = "";
	this.latitude = 0;
	this.longitude = 0;

	this.is_filled = function(){
		return ( this.has_name() 
				&& this.has_location()
				&& this.has_picture()
			);
	}

	this.has_name = function(){
		return this.name != "";
	}

	this.has_location = function(){
		return this.loc != ""; 
	}

	this.has_picture = function(){
		return this.picture != null;
	}

	this.has_coords = function(){
		return this.latitude != 0 && this.longitude != 0;
	}

}