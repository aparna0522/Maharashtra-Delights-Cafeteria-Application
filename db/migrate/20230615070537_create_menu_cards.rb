class CreateMenuCards < ActiveRecord::Migration[7.0]
  def change
    create_table :menu_cards do |t|
      t.string :name, null: false, primary_key: true
      t.string :category, null: false
      t.text :description
      t.float :price, null: false

      t.timestamps 
    end
  end
end
