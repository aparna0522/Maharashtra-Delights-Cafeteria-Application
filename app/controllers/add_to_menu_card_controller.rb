class AddToMenuCardController < ApplicationController
    def index 
    end
    def create
        menu = MenuCard.new(menu_params)
        if menu.save
            redirect_to "/addmenu"
        else
            redirect_to "/menus"
        end 
    end
    def menu_params
        params.require(:menu).permit(:category,:name,:description,:price)
    end
end
