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
		boulder = Boulder.create

		# TODO: rotate image

		if(!boulder.blank? && !picture.blank?) then
			write_picture(boulder, picture)
			render json: {boulder_id: boulder.id}
		end
	end

	protected
	def write_picture(boulder, picture)
		#file_name = Time.now.strftime('%Y%m%d%H%M%S%L') + "-#{boulder.id}.jpg"
		file_name = "boulder-#{boulder.id}.jpg"
		File.open(Rails.root.join('public', PICTURE_PATH, file_name), 'wb') do |file|
			file.write(picture.read)
		end
		boulder.picture = PICTURE_PATH + file_name
		boulder.save
	end

end
