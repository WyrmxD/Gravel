class Boulder < ActiveRecord::Base

	scope :posted, -> { where posted }
	scope :not_posted, -> { where not_posted }

	enum status: {  
		not_posted: 0,
		posted: 1,
	}

	def posted 
		self.status = :posted
	end

	def not_posted 
		self.status = :not_posted
	end

end
