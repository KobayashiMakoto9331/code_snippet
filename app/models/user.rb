class User < ApplicationRecord
  with_options presence: true, length: { maximum: 20 } do
    validates :last_name
    validates :first_name
  end

  validates :hashed_password, presence: true
  validates :email, presence: true, uniqueness: true
  
  def password(raw_password)
    self.hashed_password = BCrypt::Password.create(raw_password)
  end

  # トークン生成
  def create_jwt_token(user_id)
    # ペイロード指定
    payload = {user_id: user_id, exp: (DateTime.current + 7.days).to_i }
    # トークン生成
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end


end
