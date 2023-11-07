class DataController < ApplicationController
    def fetch_data
        data = MenuCard.order(:category)
        render json: data
    end
end
