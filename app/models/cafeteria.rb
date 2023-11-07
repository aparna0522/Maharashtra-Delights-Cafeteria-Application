class Cafeteria < ApplicationRecord
    validates :email, uniqueness: true
end
