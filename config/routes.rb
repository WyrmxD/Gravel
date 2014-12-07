Rails.application.routes.draw do

	get '/' => 'site#index'
	get 'site/index'
	resources :boulders
	post 'boulders/upload_picture' => 'boulders#upload_picture'


end
