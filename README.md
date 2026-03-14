# 🍴 RestaurantOS — Full Stack MERN Restaurant Management System

A production-ready restaurant management system built with MongoDB, Express.js, React.js, Node.js, Socket.IO, JWT, and TailwindCSS.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  React.js + TailwindCSS + Socket.IO Client + Axios             │
│  ┌──────────┐  ┌───────────────┐  ┌──────────────────┐        │
│  │  Admin   │  │    Waiter     │  │    Kitchen       │        │
│  │Dashboard │  │  Dashboard   │  │   Dashboard      │        │
│  └──────────┘  └───────────────┘  └──────────────────┘        │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP/WebSocket
┌──────────────────────────▼──────────────────────────────────────┐
│                       SERVER LAYER                              │
│  Node.js + Express.js + Socket.IO Server                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   REST API Routes                         │  │
│  │  /auth  /users  /categories  /menu  /tables  /orders     │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │   JWT Auth     │  │ Role-Based ACL │  │  Error Handler   │  │
│  └────────────────┘  └────────────────┘  └──────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                     DATABASE LAYER                              │
│  MongoDB + Mongoose ODM                                        │
│  Users │ MenuCategories │ MenuItems │ Tables │ Orders          │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
restaurant-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Login, get me
│   │   ├── userController.js     # CRUD users
│   │   ├── menuController.js     # CRUD categories & items
│   │   ├── tableController.js    # CRUD tables
│   │   └── orderController.js    # Orders + analytics
│   ├── middleware/
│   │   ├── auth.js               # JWT protect + role authorize
│   │   └── errorHandler.js       # Centralized error handling
│   ├── models/
│   │   ├── User.js
│   │   ├── MenuCategory.js
│   │   ├── MenuItem.js
│   │   ├── Table.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── menu.js
│   │   ├── tables.js
│   │   └── orders.js
│   ├── socket/
│   │   └── socketHandler.js      # Socket.IO events
│   ├── utils/
│   │   └── seeder.js             # Database seed script
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── admin/
    │   │   │   ├── AdminLayout.jsx
    │   │   │   └── Sidebar.jsx
    │   │   └── common/
    │   │       └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx    # Auth state + login/logout
    │   │   └── SocketContext.jsx  # Socket.IO connection
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── admin/
    │   │   │   ├── AdminDashboard.jsx
    │   │   │   ├── UserManagement.jsx
    │   │   │   ├── MenuCategories.jsx
    │   │   │   ├── MenuItems.jsx
    │   │   │   ├── TableManagement.jsx
    │   │   │   ├── OrderHistory.jsx
    │   │   │   └── Reports.jsx
    │   │   ├── waiter/
    │   │   │   └── WaiterDashboard.jsx
    │   │   └── kitchen/
    │   │       └── KitchenDashboard.jsx
    │   ├── services/
    │   │   └── api.js             # Axios instance
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css              # TailwindCSS + custom styles
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 🚀 Local Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas free tier)
- npm or yarn

---

### Step 1: Clone & Navigate

```bash
cd restaurant-system
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant_db
JWT_SECRET=change_this_to_a_long_random_secret_string
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

> **Using MongoDB Atlas?** Replace MONGODB_URI with your Atlas connection string.

### Step 3: Seed the Database

```bash
npm run seed
```

This creates:

- 3 users (admin, waiter, kitchen)
- 4 menu categories
- 15 menu items
- 8 tables

### Step 4: Start the Backend

```bash
npm run dev
```

Backend runs on: `http://https://restrauntos-2.onrender.com`

---

### Step 5: Setup Frontend

In a new terminal:

```bash
cd frontend
npm install
```

### Step 6: Start the Frontend

```bash
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🔑 Demo Login Credentials

| Role    | Email                  | Password   |
| ------- | ---------------------- | ---------- |
| Admin   | admin@restaurant.com   | admin123   |
| Waiter  | waiter@restaurant.com  | waiter123  |
| Kitchen | kitchen@restaurant.com | kitchen123 |

---

## 🔌 Socket.IO Events

| Event                | Direction        | Description                    |
| -------------------- | ---------------- | ------------------------------ |
| `orderPlaced`        | Server → Kitchen | New order arrives in kitchen   |
| `orderPreparing`     | Server → Waiter  | Kitchen started preparing      |
| `orderReady`         | Server → Waiter  | All items ready, notify waiter |
| `tableUpdated`       | Server → All     | Table status changed           |
| `orderStatusUpdated` | Server → All     | Any order status update        |

---

## 🛡️ API Endpoints

### Auth

```
POST   /api/auth/login          Public
GET    /api/auth/me             Protected
```

### Users (Admin only)

```
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

### Menu

```
GET    /api/categories          All roles
POST   /api/categories          Admin
PUT    /api/categories/:id      Admin
DELETE /api/categories/:id      Admin

GET    /api/menu                All roles
POST   /api/menu                Admin
PUT    /api/menu/:id            Admin
DELETE /api/menu/:id            Admin
```

### Tables

```
GET    /api/tables              All roles
POST   /api/tables              Admin
PATCH  /api/tables/:id          All roles
DELETE /api/tables/:id          Admin
```

### Orders

```
POST   /api/orders              Waiter, Admin
GET    /api/orders              All roles
PATCH  /api/orders/:id/status   All roles
GET    /api/orders/analytics/summary        Admin
GET    /api/orders/analytics/category-sales Admin
```

---

## 🎨 UI Color System

| Color     | Meaning            |
| --------- | ------------------ |
| 🟢 Green  | Available / Served |
| 🟡 Yellow | Occupied           |
| 🔴 Red    | Preparing / Urgent |
| 🔵 Blue   | Ready to Serve     |
| ⚪ Gray   | Pending / Default  |

---

## 🔄 Complete Order Workflow

```
1. Waiter opens Table Dashboard
2. Selects an available table
3. Browses menu by category
4. Adds items to cart with quantities
5. Optionally adds notes (allergies, etc.)
6. Sends order to kitchen
7. Table status → "occupied"
8. Kitchen receives order in real-time via Socket.IO
9. Kitchen taps "Start" on each item → status: "preparing"
10. Kitchen taps "Ready" on each item → status: "ready"
11. When all items ready → Waiter gets notification
12. Waiter taps "Mark as Served"
13. Table status → "available" again
14. Admin sees updated analytics
```

---

## 🌐 Production Deployment Notes

- Set `NODE_ENV=production` in backend `.env`
- Use a strong `JWT_SECRET` (32+ random chars)
- Use MongoDB Atlas for production database
- Build frontend: `npm run build` then serve with nginx or similar
- Consider using PM2 for Node.js process management
- Enable HTTPS in production
