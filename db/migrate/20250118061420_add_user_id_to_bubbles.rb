class AddUserIdToBubbles < ActiveRecord::Migration[7.1]
  def change
    add_reference :bubbles, :user, null: false, foreign_key: true
  end
end
