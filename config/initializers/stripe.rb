Rails.configuration.stripe = {
  :publishable_key => "",
  :secret_key      => ""
}

print "Vedang"
print Rails.configuration.stripe[:publishable_key]
print Rails.configuration.stripe[:secret_key]

Stripe.api_key = Rails.configuration.stripe[:secret_key]
