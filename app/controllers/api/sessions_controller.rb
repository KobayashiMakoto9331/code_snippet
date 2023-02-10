class Api::SessionsController < ApplicationController
  protect_from_forgery with: :null_session
  wrap_parameters format: []

  def create
    email = login_params['email']['value']
    password = login_params['password']['value']
    user = User.find_by(email: email)

    # ユーザーが見つからない場合は処理を終了
    return render json: { result: NG } unless user.present?

    # パスワードが一致しない場合も処理終了
    return render json: { result: NG } unless is_authenticated(user, password)

    # トークン生成
    token = user.create_jwt_token(user.id)

    # トークン返却
    render json: { token: token, result: OK }
  end

  # 認証済みユーザーを取得して返却する
  def fetch_auth_user
    render json: current_user
  end

  private

  def login_params
    params.require(:login_params).permit(email: {}, password: {})
  end

  # パスワードが正しいか認証する
  def is_authenticated(user, raw_password)
    user.present? &&
      user.hashed_password.present? &&
      raw_password.present? &&
      BCrypt::Password.new(user.hashed_password) == raw_password
  end
end