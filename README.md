# E-commerce REST API

The E-commerce REST API project has been created to handle CRUD operations through HTTP requests. This API enables the following operations:

- Creation of products and brands.
- Reading of products and brands.
- Updating of products and brands.
- Deletion of products and brands.

Furthermore, the API allows for user registration and authentication with permissions to create, update, and delete products and brands. When registering users, the API encrypts passwords and provides users with a token to make changes to products and brands.

The API also supports the image uploading process and its subsequent storage in the database, along with other attributes of products and brands. It has specific routes for users, products, and brands, as well as combinations of these elements.

## Available Endpoints

The available endpoints in the API are as follows:

- User route: `/api/auth`
- Product route: `/api/product`
- Brand route: `/api/brand`

## Technologies Used

This project has been developed using the following technologies and libraries:

- Node.js: A JavaScript runtime platform.
- Express: A Node.js web application framework for building the API.
- Sequelize: An Object-Relational Mapping (ORM) for database communication.
- MySQL: A relational database management system.
- bcryptjs: A library for password encryption.
- JSON Web Tokens (jsonwebtoken): For user authentication.
- express-validator: Middleware for data validation in requests.
- cors: Middleware for enabling cross-origin resource sharing in the API.
- dotenv: For loading environment variables from a `.env` file.

## Quick Start

To begin using this API, follow these steps:

1. **Clone the Repository**:
   ```
   git clone https://github.com/ivanbenitez14/E-commerce-backend.git
   cd your-backend-project
   ```
   
3. **Install Dependencies**:
   ```
   npm install
   ```

3. **Configure Environment Variables**:
  - Create a file named `.env` in the project's root directory.
  - Define the required environment variables, including database configuration and authentication secrets.
  
  ```
  PORT=4000
  SECRET_JWT_SEED="your-secret-seed"
  MYSQL_URL=mysql://"connection string"
  ```

4. **Start the API in Development Mode**:
   ```
   npm run dev
   ```

You can now start using this REST API to effectively manage products, brands, and users.

Enjoy working on your backend project!


4. **Start the API in Development Mode**:
