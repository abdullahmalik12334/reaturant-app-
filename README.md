# 🍽️ CraveNest — Restaurant App FULL STACK (Assignment #02)

CraveNest is a restaurant application developed using React Native (Expo), Node.js, Express.js, and MongoDB. The application allows customers to explore food items, browse different food categories, manage their favorites, add items to their cart, and place food orders. It also includes table reservation functionality and a backend API for managing restaurant data.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native, Expo |
| Frontend Language | TypeScript, TSX |
| Navigation | Expo Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas / MongoDB Compass |
| ODM | Mongoose |
| Authentication | JWT (JSON Web Token) |
| Password Security | bcrypt |
| API Testing | Thunder Client |
| Development Tools | Visual Studio Code, macOS Terminal |

## ✨ Features

### 👤 Customer Features

- Customer registration and login
- JWT-based authentication
- Browse available food items
- Explore different food categories
- View food images, names, descriptions, and prices
- Search for food items
- Add and remove items from favorites
- Add and remove items from the cart
- Update food item quantities
- Calculate cart subtotal and total amount
- Place food orders
- Select available payment methods
- Make table reservations
- View and manage profile information
- Change the application theme
- Mobile-friendly user interface

### 👨‍🍳 Restaurant Management Features

- Manage restaurant food menu through backend APIs
- Store and retrieve food items from MongoDB
- Manage customer orders through implemented order APIs
- Manage table reservations through implemented reservation APIs
- Store customer accounts and profile information
- Manage food reviews through the review API



## 🗂️ Project Structure

```text
restaurant-app/
│
├── src/
│   └── app/
│       ├── index.tsx
│
├── CraveNest-Backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Food.js
│   │   ├── Order.js
│   │   ├── Reservation.js
│   │   └── Review.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── foods.js
│   │   ├── orders.js
│   │   ├── reservations.js
│   │   └── reviews.js
│   │
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Install Frontend Dependencies

Open the terminal in the project root directory:

cd "/Users/4star/restaurant-app"
npm install


### 2. Install Backend Dependencies

Open a terminal and navigate to the backend directory:

cd "/Users/4star/restaurant-app/CraveNest-Backend"
npm install


### 3. Configure Environment Variables

Create a `.env` file inside the `CraveNest-Backend` directory.


PORT=5001
MONGO_URI=your_mongodb_connection_string


Replace the placeholder values with your actual MongoDB connection string and a strong JWT secret.

**Important:** Never upload your `.env` file or database credentials to a public repository.

### 4. Start the Backend Server

Run the following command inside the `CraveNest-Backend` directory:


npm run dev

The backend runs at:

http://localhost:5001

Health check endpoint:

http://localhost:5001/api/health

Expected health check response:

{
  "success": true,
  "message": "CraveNest API is working"
}


### 5. Start the Expo App

Open a second terminal window:


cd "/Users/4star/restaurant-app"
npx expo start


Scan the QR code using Expo Go to run the application on your phone.

**Important:** When running the application on a physical phone, configure the frontend API URL to use your Mac's current local network IP address instead of `localhost`.

Example:


http://YOUR_MAC_IP:5001


Make sure your phone and Mac are connected to the same Wi-Fi network.

## 🗄️ Database

The application uses MongoDB to store and manage restaurant data.

The database supports:

- User accounts and authentication
- Food menu items
- Customer orders
- Table reservations
- Food and restaurant reviews

The backend uses Mongoose models to define and interact with database collections.

## 🚪 Login Credentials

Use registered accounts to log in to CraveNest.

| Role | Email | Password |
|---|---|---|
| Customer |  customer email |  password |
| Manager |   manager email |   password |

*These are placeholders, not pre-created demo accounts. Login will work only after the relevant accounts have been created and the backend authentication is configured.*

## 📡 API Endpoints

Base URL:

http://localhost:5001

### 🔑 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in a user |

### 🍔 Food Menu

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/foods` | As configured | Retrieve food menu items |
| POST | `/api/foods` | Verify backend permissions | Create a food item, if implemented |
| PATCH | `/api/foods/:id` | Verify backend permissions | Update a food item, if implemented |
| DELETE | `/api/foods/:id` | Verify backend permissions | Delete a food item, if implemented |

### 🛒 Orders

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders` | As configured | Place a new order |
| GET | `/api/orders` | As configured | Retrieve orders, if implemented |
| Additional routes | `/api/orders` | As configured | Verify order history, cancellation, and status operations |

### 📅 Reservations

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/reservations` | As configured | Create a table reservation |
| GET | `/api/reservations` | As configured | Retrieve reservations, if implemented |
| Additional routes | `/api/reservations` | As configured | Verify table availability and cancellation operations |

### ⭐ Reviews

| Method | Endpoint | Access | Description |
|---|---|---|---|
| Available routes | `/api/reviews` | As configured | Review creation and retrieval, depending on implementation |

*The endpoints above reflect the known CraveNest backend route structure. Verify each HTTP method, access permission, and operation in its corresponding route file before treating this table as the final API specification.*

## 🧪 API Testing

The backend APIs can be tested using Postman or Thunder Client.

Suggested testing sequence:

1. Start the backend server.
2. Test `GET /api/health`.
3. Register a customer using `POST /api/auth/signup`.
4. Log in using `POST /api/auth/login`.
5. Verify the returned authentication token.
6. Retrieve food items using `GET /api/foods`.
7. Test food search and menu display in the mobile app.
8. Test adding items to favorites and the cart.
9. Test order creation and order history.
10. Test table reservation functionality.
11. Test review functionality.
12. Verify authentication and authorization for protected endpoints.

## 💳 Payment Information

Selecting a payment method does not itself process an online transaction. Integration with a supported payment gateway is required for real card, Easypaisa, or JazzCash payments. Cash on Delivery can be supported as a separate payment option.
