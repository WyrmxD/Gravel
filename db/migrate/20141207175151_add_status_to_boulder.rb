class AddStatusToBoulder < ActiveRecord::Migration
  def change
  	add_column :boulders, :status, :integer, default: 0
  end
end
