class User < ApplicationRecord
  with_options presence: true, length: { maximum: 20 } do
    validates :last_name
    validates :first_name
  end

  validates :hashed_password, presence: true
  validates :email, presence: true
  
  def password(raw_password)
    self.hashed_password = BCrypt::Password.create(raw_password)
  end
end
