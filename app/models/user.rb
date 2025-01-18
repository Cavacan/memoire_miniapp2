class User < ApplicationRecord
  authenticates_with_sorcery!

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 2 }, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
end
