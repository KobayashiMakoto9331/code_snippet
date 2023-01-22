class Api::SnippetsController < ApplicationController
  protect_from_forgery with: :null_session
  wrap_parameters format: []

  def index
    snippets = Snippet.all.order(sort: :asc)
    render json: snippets, methods: :language
  end

  def create
    snippet = Snippet.new(snippet_params)
    if snippet.save
      render(json: snippet)
    else
      raise
    end
  end

  def update
    snippet = Snippet.find_by(id: snippet_params[:id])
    snippet.update!(snippet_params)
  end

  # 全てのSnippetのsortを更新
  def update_sort
    all_snippet_params.each_with_index do |t,i|
      snippet = Snippet.find_by(id: t[:id])
      snippet.update!( sort: i )
    end
    render json: {result: "ok"}
  end

  def delete
    snippet = Snippet.find_by(id: snippet_id_params)
    if snippet.present?
      snippet.destroy
    end
  end

  private

  # snippetを作成、更新するために使用
  def snippet_params
    params.require(:snippet).permit(:id, :title, :contents, :languages_id)
  end

  # 更新削除で使用
  def snippet_id_params
    params.require(:snippet_id)
  end

  # snippetのsort順を更新するために使用
  def all_snippet_params
    params.require(:_json).map do |param|
      param.permit(:id)
    end
  end
end