MERN E-commerce Backend
This is the backend server for the MERN E-commerce Application. It provides RESTful APIs to handle user authentication, product management, orders, and cart functionality using MongoDB, Express, and Node.js. The backend is built with the following technologies:

Node.js for the server-side JavaScript environment.
Express.js for creating the API endpoints and handling routing.
MongoDB Atlas for cloud-based database storage.
Multer for handling image uploads.
JWT (JSON Web Tokens) for authentication.
Table of Contents
Features
Technologies Used
Installation
Environment Variables
API Endpoints
Running the App
License
Features
User Authentication

User registration and login (JWT-based authentication).
Password hashing using bcrypt.
Product Management

Create, update, and delete products.
Upload product images using Multer.
Store image files in MongoDB using binary data.
Cart and Orders

Add products to the cart.
Place orders for items in the cart.
Admin Operations

Admin user can manage products and view orders.
Technologies Used
Node.js: JavaScript runtime for server-side logic.
Express.js: Fast, minimalist framework for building web applications.
MongoDB Atlas: NoSQL database for storing product, user, and order information.
Mongoose: MongoDB ODM for schema-based data management.
Multer: Middleware for handling image uploads.
JWT (JSON Web Token): Used for secure user authentication.
Bcrypt: For secure password hashing.
Cors: To handle Cross-Origin Resource Sharing.
Installation
Prerequisites
Node.js: Ensure Node.js is installed on your machine.
MongoDB Atlas: Set up a MongoDB Atlas account and get the connection string.
Postman/Insomnia: API testing tool.


Clone this repository:

bash
Copy code
git clone https://github.com/your-username/mern-ecommerce-backend.git
Navigate to the project directory:

bash
Copy code
cd mern-ecommerce-backend
Install dependencies:

bash
Copy code
npm install
Create a .env file at the root and add your environment variables (see below).

Start the server:

bash
Copy code
npm start
