class Api::SnippetsController <ActionController::Base
  
  def index
    snippets = Snippet.all
    render json: snippets, methods: :language
  end


  def create
  end

  def edit
  end

  def update
  end

  def delete
  end

  private

  def snippet_params
  end
end