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
		angle = params[:picture_angle]
		
		boulder = create_boulder(params)

		if(!boulder.blank? && !picture.blank?) then
			write_picture(boulder, picture, angle)
			render json: {boulder_id: boulder.id}
		end
	end

	protected

	def create_boulder(params)
		boulder = Boulder.new
		boulder.name = params[:boulder_name]
		boulder.location = params[:boulder_loc]
		boulder.latitude = params[:boulder_latitude]
		boulder.longitude = params[:boulder_longitude]
		boulder.save
		
		return boulder
	end

	def write_picture(boulder, picture, angle)
		file_name = "boulder-#{boulder.id}.jpg"
		File.open(Rails.root.join('public', PICTURE_PATH, file_name), 'wb') do |file|
			file.write(picture.read)
		end
		boulder.picture = file_name
		boulder.posted
		boulder.save

		rotate_picture(boulder, angle)		
		make_thumbnail(boulder)
	end

	def rotate_picture(boulder, angle)
		image = MiniMagick::Image.new(Rails.root.join('public', PICTURE_PATH, boulder.picture))
		image.rotate angle
	end

	def make_thumbnail(boulder)
		image = MiniMagick::Image.open(Rails.root.join('public', PICTURE_PATH, boulder.picture))
		image.resize "250x250"
		image.write Rails.root.join('public', THUMBNAIL_PATH, boulder.picture)
	end

end
