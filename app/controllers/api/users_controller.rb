class Api::UsersController < ApplicationController
  protect_from_forgery with: :null_session
  wrap_parameters format: []

  def create
    # メールアドレスユニーク確認
    user = User.find_by(email: user_params['email']['value'])
    if user.present?
      error_message = '既に登録済みのメールアドレスです'
      return render json: { result: NG, error_message: }
    end

    # パスワードが両者一致（ハックされる可能性）していない場合はエラー
    return raise if user_params['password']['value'] != user_params['password_confirmation']['value']

    # ユーザー登録
    user = User.new
    user.first_name = user_params['first_name']['value']
    user.last_name = user_params['last_name']['value']
    user.email = user_params['email']['value']
    user.password(user_params['password']['value'])
    if user.save
      return render json: { result: OK }
    else
      raise
    end
  end

  private

  # ユーザー登録 ストロングパラメーター
  def user_params
    params.require('user').permit(first_name: {}, last_name: {}, email: {}, password: {}, password_confirmation: {})
  end
end