class SessionsController < ApplicationController
    def create
        customer = Customer.find_by(email:login_params[:email])
        if customer && customer.authenticate(login_params[:password])
            session[:customer_id] = customer.id
            puts "Customer with ID #{customer.id} inside!"
            redirect_to "/dashboard"
        else
            flash[:login_errors] = ["Please input valid credentials."]
            redirect_to "/"
        end
    end
    def destroy
        session.clear
        redirect_to "/"
    end
    private
    def login_params
        params.require(:login).permit(:email,:password)
    end

end
