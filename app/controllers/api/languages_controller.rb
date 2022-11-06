class Api::LanguagesController <ActionController::Base

  def index
    languages = Language.all
    render json: languages
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