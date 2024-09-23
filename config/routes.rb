Rails.application.routes.draw do
  root 'home#index'
  resources :images, only: %i[index update create]
  resources :bubbles
end
