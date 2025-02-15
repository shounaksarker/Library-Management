# Library Management System

This is a simple library management system built with Node.js, Express, and MongoDB. It allows users to register, login, borrow books, return books, and view their loan history.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/library-samp.git
    cd library-samp
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your environment variables. You can use the [.env.example](http://_vscodecontentref_/1) file as a reference.

4. Start the development server:

    
```sh    npm run dev
    ```

## Usage

- Register a new user
- Login with the registered user
- Borrow books
- Return books
- View loan history
- Get token after login and use that as Authorization in header of each request

## API Endpoints

### User Routes

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login a user

### Book Routes (Protected)

- `GET /api/books` - Get all books
- `GET /api/books/filtered` - Get filtered books {add ?query based on controller code}
- `POST /api/books/add` - Add a new book

### Loan Routes (Protected)

- `POST /api/loans/borrow` - Borrow a book
- `POST /api/loans/return` - Return a book
- `GET /api/loans/my-loans` - Get user loans

## Environment Variables

The following environment variables are required:

- [MONGODB_URI](http://_vscodecontentref_/2) - MongoDB connection string
- [PORT](http://_vscodecontentref_/3) - Port number for the server
- [JWT_SECRET](http://_vscodecontentref_/4) - Secret key for JWT

Example [.env](http://_vscodecontentref_/5) file:

```env
MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>/<DB_NAME>?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_secret_key