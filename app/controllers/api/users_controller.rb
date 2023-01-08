class Api::UsersController <ActionController::Base
  protect_from_forgery with: :null_session
  wrap_parameters format: []

  def create

    # ユーザーが重複していないか確認
    user = User.find_by(email: user_params[:email])
    # パスワードが両者一致しているかどうかを確認
    # ユーザー登録
    # ログインさせる
  end

  private

  # ユーザー登録
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirm)
  end
end