class CreateBubbles < ActiveRecord::Migration[7.1]
  def change
    create_table :bubbles do |t|
      t.string :title
      t.string :text

      t.timestamps
    end
  end
end
