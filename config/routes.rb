Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    resources :languages
    get 'snippets' => 'snippets#index'
    post 'snippets' => 'snippets#index'
    post 'create_snippet' => 'snippets#create'
    post 'update_snippet' => 'snippets#update'
    post 'delete_snippet' => 'snippets#delete'
  end
end
