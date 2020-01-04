Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  namespace :api do
    namespace :v1 do
      get 'tasks/index'
      post 'tasks/create'
      get '/show/:id', to: 'tasks#show'
      delete '/destroy/:id', to: 'tasks#destroy'
      post '/edit/:id', to: 'tasks#edit'
    end
  end
  root 'welcome#index'
  get '/*path' => 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end