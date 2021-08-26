Rails.application.routes.draw do
  devise_for :users
  root 'top#index'

  resources :reactions, only: [:create]
  resources :matching, only: [:index]
  resources :chat_rooms, only: [:create, :show]

end
