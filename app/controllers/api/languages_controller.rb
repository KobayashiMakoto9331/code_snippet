class Api::LanguagesController < ApplicationController
  protect_from_forgery with: :null_session
  wrap_parameters format: []

  def index
    languages = Language.all
    render json: languages
  end

  def create
    # 既に登録がある場合は処理を抜ける
    trimmed_language = language_language_params[:language].strip
    return if Language.find_by(language: trimmed_language)

    # 新規登録
    language = Language.new(language: trimmed_language)
    if language.save
      render(json: language)
    else
      raise
    end
  end

  # 言語の更新
  def update
    language = Language.find_by(id: language_params[:id])
    language.update!(language_params)
  end

  # 言語削除
  def delete
    language = Language.find_by(id: language_id_params[:language_id])
    if language.present?
      language.destroy
    else
      raise
    end
  end

  private

  # 更新用
  def language_params
    params.require(:language).permit(:id, :language)
  end

  # 新規登録用
  def language_language_params
    params.permit(:language)
  end

  # 削除用
  def language_id_params
    params.permit(:language_id)
  end
end