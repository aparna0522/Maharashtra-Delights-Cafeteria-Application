class ApplicationController < ActionController::Base
    include ApplicationHelper
    helper_method :current_customer
    helper_method :logged_in?
    def current_customer
        Customer.find_by(id: session[:customer_id])
    end
    def logged_in?
        !current_customer.nil?
    end
end