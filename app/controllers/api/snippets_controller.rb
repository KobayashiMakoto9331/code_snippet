class Api::SnippetsController <ActionController::Base
  
  def index
    snippets = Snippet.all
    render json: snippets
  end
end