class Api::SnippetsController <ActionController::Base
  protect_from_forgery with: :null_session

  def index
    snippets = Snippet.all
    render json: snippets, methods: :language
  end

  def create
    snippet = Snippet.new(snippet_params)

    if snippet.save
      pp '保存した'
    else
      pp '保存に失敗'
      pp snippet.errors
    end
  end

  def edit
  end

  def update
    snippet = Snippet.find_by(id: snippet_params[:id])
    snippet.update!(snippet_params)
  end

  def delete
    snippet_id = params[:snippet_id]
    snippet = Snippet.find_by(id: snippet_id)
    if snippet.present?
      snippet.destroy
    end
  end

  private

  def snippet_params
    params.require(:snippet).permit(:id, :title, :contents, :languages_id)
  end
end