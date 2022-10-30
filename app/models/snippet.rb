class Snippet < ApplicationRecord
  validates :language, presence: true
  validates :title, presence: true
  validates :contents, presence: true
end
