class BouldersController < ApplicationController

	skip_before_filter :verify_authenticity_token, only: [:upload_picture]

	def index
		@boulder = Boulder.posted
	end

	def new
		@boulder = Boulder.create
	end

	def create
	end

	def upload_picture
		picture = params[:picture]
		boulder_id = params[:boulder_id].split("_")[2]
		boulder = Boulder.find(boulder_id)

		if(!boulder.blank? || !picture.blank?) then
			write_picture(boulder, picture)
			render json: {response: "OK"}
		end

	end

	def show
		@boulder = Boulder.find(params[:id])
	end

	def update
	end

	protected
	def write_picture(boulder, picture)
		file_name = Time.now.strftime('%Y%m%d%H%M%S%L') + "-#{boulder.id}.jpg"
		File.open(Rails.root.join('public', 'uploads', file_name), 'wb') do |file|
			file.write(picture.read)
		end
		boulder.picture = file_name
		boulder.save
	end

end
