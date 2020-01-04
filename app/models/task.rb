class Task < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :title, uniqueness: {
      scope: :user_id,
  }
  validates :description, presence: true
  validates :user_id, presence: true
end
