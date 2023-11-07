class PaymentController < ApplicationController
    $pass_the_total = 0
    def new
      @subtotal = $pass_the_total
    end
    
    def create
      puts params
      subtotal = params[:aggregate].to_i
      $pass_the_total = subtotal

      customer = Stripe::Customer.create({
        email: params[:stripeEmail],
        source: params[:stripeToken],
      })

      session = Stripe::Checkout::Session.create(
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: subtotal,
              product_data: {
                name: 'Product Name',
                description: 'Product Description'
              }
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: "http://127.0.0.1:3000/orderPlaced", 
        cancel_url: "http://127.0.0.1:3000/dashboard" 
      )

    redirect_to "/orderPlaced"
    
    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to "/dashboard"
    end
end
