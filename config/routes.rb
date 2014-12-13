Rails.application.routes.draw do

	get '/' => 'site#index', as: 'site_index'
	#get 'site/index'
	#resources :boulders
	#post 'boulders/upload_picture' => 'boulders#upload_picture'



	namespace :api do
		get		'boulder'	=>	'boulders#index'
		post	'boulder'	=>	'boulders#create', as: 'boulder_create'
		get		'boulder/:id'	=>	'boulders#read', as: 'boulder_read'
		put		'boulder/:id'	=>	'boulders#update', as: 'boulder_update'
		delete	'boulder/:id'	=>	'boulders#delte', as: 'boulder_delete'
	end

end
