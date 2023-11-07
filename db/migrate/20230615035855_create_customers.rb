class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers, primary_key: "email" do |t|
      t.string :email, null: false
      t.string :name, null: false
      t.string :password_digest, null: false
      t.timestamps
    end

    add_index :customers, :email, unique: true
  end
end