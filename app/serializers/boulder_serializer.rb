class BoulderSerializer < ActiveModel::Serializer
  attributes :id, :name, :picture, :location, :latitude, :longitude, :created_at

  def created_at
  	date = object.created_at.to_date
  	"#{date.day}-#{date.month}-#{date.year}"
  end

end
