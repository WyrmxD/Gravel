class Api::BouldersController < ApplicationController

	skip_before_filter :verify_authenticity_token, only: [:create]

	# GET
	def index
		limit = params[:limit] || 10
		offset = params[:offset] || 0
		render json: Boulder.posted.offset(offset).limit(limit).order(:id), :root => false
	end

	# POST
	def create
		picture = params[:picture]
		picture_angle = params[:picture_angle]
		
		boulder = Boulder.new
		boulder.name = params[:boulder_name]
		boulder.location = params[:boulder_loc]
		boulder.latitude = params[:boulder_latitude]
		boulder.longitude = params[:boulder_longitude]
		boulder.save

		# TODO: rotate image
		if(picture_angle != 0) then

		end
		# TODO: make thumbnail

		if(!boulder.blank? && !picture.blank?) then
			write_picture(boulder, picture)
			render json: {boulder_id: boulder.id}
		end
	end

	protected
	def write_picture(boulder, picture)
		file_name = "boulder-#{boulder.id}.jpg"
		File.open(Rails.root.join('public', PICTURE_PATH, file_name), 'wb') do |file|
			file.write(picture.read)
		end
		boulder.picture = PICTURE_PATH + file_name
		boulder.posted
		boulder.save
	end

end
