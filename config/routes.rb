Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    # 言語
    get 'languages' => 'languages#index'
    post 'languages' => 'languages#index'
    post 'create_language' => 'languages#create'
    post 'update_language' => 'languages#update'
    post 'delete_language' => 'languages#delete'

    # スニペット
    get 'snippets' => 'snippets#index'
    post 'snippets' => 'snippets#index'
    post 'create_snippet' => 'snippets#create'
    post 'update_snippet' => 'snippets#update'
    post 'update_snippet_index' => 'snippets#update_sort'
    post 'delete_snippet' => 'snippets#delete'
  end
end
