class Api::BouldersController < ApplicationController

	def index
		limit = params[:limit] || 10
		offset = params[:offset] || 0
		render json: Boulder.posted.offset(offset).limit(limit), :root => false
	end
end
