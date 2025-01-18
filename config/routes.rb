Rails.application.routes.draw do
  root 'home#index'
  resources :images, only: %i[index update create]
  resources :bubbles

  resources :users, only: [:create]

  get 'login' => "sessions#new"
  post 'login' => "sessions#create"
  delete 'logout' => "sessions#destroy"
end
