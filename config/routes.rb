Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get "/" => "customers#index"
  post "/customers" => "customers#create"
  get "/dashboard" => "cafeteria#index"
  get '/data' => 'data#fetch_data'
  get '/addmenu' => 'add_to_menu_card#index'
  post "/addmenu" => "add_to_menu_card#create"
  post "/sessions" => "sessions#create"
  get "/signout" => "sessions#destroy"
  get "/orderPlaced" => "payment#new"
  post '/payment', to: 'payment#create'
  resources :payment
  resources :order_items
end
