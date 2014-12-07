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
		boulder = params[:boulder]
		render json: {response: "OK"}
	end

	def show
		@boulder = Boulder.find(params[:id])
	end

	def update
	end

end
