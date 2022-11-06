class Snippet < ApplicationRecord
  attr_accessor :language
  validates :languages_id, presence: true
  validates :title, presence: true
  validates :contents, presence: true


  def language
    Language.find(self.languages_id).language
  end
end
