class User < ApplicationRecord
  with_options presence: true, length: { maximum: 20 } do
    validates :mst_last_name
    validates :mst_first_name
  end
  
  validates :nickname, length: { maximum: 20 }
  validates :hashed_password, presence: true
  validates :email, presence: true
  
  def password(raw_password)
    self.mst_password = BCrypt::Password.create(raw_password)
  end
end
