
# PizzaLand : PIZZA DELIVERY APPLICATION

This is a web application designed for ordering pizzas online. It allows users to browse a selection of pizzas, customize their orders, and arrange for delivery.


## Features

- **Menu Display**: View a variety of pizzas with descriptions, prices, and sizes.
- **Customization Options**: Choose toppings, sizes, and crust types.
- **Order Management**: Add pizzas to the cart, view cart contents, and edit orders.
- **User Authentication**: Log in to save orders and view past orders.
- **Admin Panel**: Manage menu items, view orders, and update order statuses.


## Project Overview :-

1. Crafting the Pizza Delivery App: The journey began with a deep dive into the MERN stack — MongoDB, Express.js, React, and Node.js. Leveraging these technologies, I contributed to the creation of a dynamic and responsive app that allows users to customize their pizzas and place orders with ease.

2. Pizza Customization Flow: The app’s highlight was its intuitive pizza customization flow. Users could choose from a variety of pizza bases, sauces, cheeses, and different (veg or non-veg) toppings, creating a personalized pizza experience.

3. Payment Integration with Razorpay: To ensure secure transactions, I seamlessly integrated Razorpay test mode for payment processing.

4. Inventory Management and Product Stock Updates: For the admin side, i implemented a mini inventory management system. It tracked the availability of ingredients, updating stock levels after each order. This ensured a smooth and efficient process for both users and admin.And admin will be able to see notifications if any product’s quantity falls below a threshold, ensuring timely replenishment and preventing any disruption in service.

**Demo Video** : 
[Watch Here](https://youtu.be/qz2tmYiAUfk)



## Technologies Used

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express 
- **Database**: MongoDB for storing user and order information

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Edasgh/Pizza-Delivery_web.git
   ```

2. Install dependencies:
   ```bash
   npm install
   cd Client
   npm install
  
  
   ```

3. Set up environment variables (create a `.env` file) in the root directory:
   ```plaintext
   MONGO_URI=<your-database-url>
   PORT=8080
   JWT_SECRET=<your-jwt-secret>
   KEY_ID=<your-razorpay-key-id>
   KEY_SECRET=<your-razorpay-key-secret>
   ```

4. Go to the root directory & start the application:
   ```bash
   cd..
   npm start
   ```

5. Visit `http://localhost:5173` in your browser.

## Usage

1. Register or log in to start your order.
2. Browse the pizza menu and select your desired items.
3. Customize your pizza, add to cart, and check out.
4. Track your order status from your account page.

## Contributing

Feel free to fork the repository and create pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License.

---
