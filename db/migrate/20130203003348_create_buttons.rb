class CreateButtons < ActiveRecord::Migration
  def change
    create_table :buttons do |t|
      t.string :name
      t.integer :num
      t.integer :sides
      t.integer :mod

      t.timestamps
    end
  end
end
