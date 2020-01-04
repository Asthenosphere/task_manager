class Task < ApplicationRecord
  belongs_to :user
  validates :title, uniqueness: {
      scope: :user_id,
  }
  validates :title, presence: true
  validates :description, presence: true
end
