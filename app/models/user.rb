class User < ApplicationRecord
  has_many :tasks, dependen: destroy
  has_secure_password
  validates_presence_of :username, :email
  validates_uniqueness_of :username, :email
end
