class Task < ApplicationRecord
  belongs_to :user
  has_many :task_categories
  has_many :categories, through: :task_categories
  validates :title, presence: true
  validates :title, uniqueness: {
      scope: :user_id,
  }
  validates :description, presence: true
  validates :user_id, presence: true
end
