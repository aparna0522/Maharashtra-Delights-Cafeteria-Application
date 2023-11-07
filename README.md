# Maharashtra Delights - Cafeteria Application using Ruby on Rails

### Project Description: 
This is a cafeteria (restaurant) application built using Ruby on Rails and SQLite3 database. The project allows user login, payment for a specific order, browsing the menu catalogue, and allows the manager to add menu to the menu catalogue.

### Dependencies
Rails 6.1.3.1 \
Ruby 3.0.0 \
Database: SQLite3/development \
Tables: Menus, Order, Order_Items, Users (Setup mentioned below)

### How to run this project locally?

1. Check if you have rbenv, node, yarn, bundler, ruby, rails installed on your local machine using the following commands
```
rbenv --version 
node --version
yarn --version
bundler --version
ruby --version
rails --version
```
2. Install rbenv, node, yarn, bundler, ruby, rails on your local machine.
```
brew install rbenv
brew install node
brew install npm
brew install yarn
brew install rails
brew install bundler
brew install ruby
```
3. Install the webpacker using the following command.
```
bundle exec rake webpacker:install
```
4. Now use the following commands to set up the database
```
bundle e rails db:setup
bundle e rails db:migrate
```
Navigate to the folder called InitialSetupFolder/TableCreate.sql. In your terminal type: ```sqlite3```, then use a database of your choice and create the database with the mentioned sql commands.
Next, you can populate your database by using the rails console or creating a rake task as follows:
```
restaurant_list = JSON.parse(File.read('RestaurantDB.json')) 

restaurant_list.each do |restaurant|
  Restaurant.create(restaurant.to_h)
end
```

5. To make the Payment Gateway working: \
   a. Create a developer mode account on Stripe \
   b. Find the API keys under the Developers Section \
   c. Now, paste the Publishable key in the file: ```config/initializers/stripe.rb``` and ```app/views/cafeteria/index.html.erb```
6. Now run the project using 
```
rails s
OR 
bundle execute rails s
```
-- Feel free to open a discussion if you have difficulties setting up the application

## Project Demo: 
https://github.com/aparna0522/Maharashtra-Delights/assets/36110304/31951e02-fbe1-47ff-9038-7df772bb8182

### Possible Future Refinements:
1. Allowing only the manager to view the /addmenu endpoint. 
2. Creating a view for the chefs/clerks only, showing all the new and the in progress orders. 
3. Creating views for the manager to see the monthly sales according to every food item.
4. Allow the manager to list all the items in the admin console and allow to perform CRUD operations. 
