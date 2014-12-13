class AddBoulderFields < ActiveRecord::Migration
  def change
	add_column :boulders, :location, :string, default: ""
	add_column :boulders, :latitude, :float, default: 0
	add_column :boulders, :longitude, :float, default: 0
  end
end
