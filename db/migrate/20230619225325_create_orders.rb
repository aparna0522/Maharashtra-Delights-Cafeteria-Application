class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.string :order_id, null: false
      t.integer :user_id, null: false
      t.decimal :total_amount, precision: 10, scale: 2, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

    end
    PRAGMA foreign_keys=on;
    create_table :order_items do |t|
      t.references :order, foreign_key: true
      t.string :name
      t.integer :quantity
      t.decimal :price, precision: 10, scale: 2
    end

  end
end
