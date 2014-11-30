Rails.application.routes.draw do

  get 'site/index'

	get '/' => 'site#index'
	resources :boulders 

end
