class CreateBoulders < ActiveRecord::Migration
  def change
	create_table :boulders do |t|
		t.string :name
		t.string :coords
      	t.text :description
      	t.string :picture
		t.timestamps
	end
  end
end
