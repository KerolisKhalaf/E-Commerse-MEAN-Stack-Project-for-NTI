# 🛍️ KKH E-Commerce Store

Full-stack e-commerce application with Angular 17 frontend and Node.js/Express backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (v4.4+)
- Git

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd front/kkh
npm install
ng serve -o
```

## 📊 Default Data

### Admin Account
- Email: `keroliskhalaf@gmail.com`
- Password: `kerolis123`

### Sample Products
- 6 pre-loaded products (Electronics & Sports)
- Real images from Unsplash

## 🛠️ Tech Stack

**Frontend:** Angular 17, Bootstrap 5, TypeScript
**Backend:** Node.js, Express, MongoDB, JWT
**Database:** MongoDB with Mongoose ODM

## 📁 Project Structure

```
├── backend/          # Node.js API server
├── front/kkh/        # Angular frontend
└── README.md
```

## 🔧 Available Scripts

**Backend:**
- `npm start` - Production server
- `npm run dev` - Development server
- `npm run seed` - Seed database

**Frontend:**
- `ng serve` - Development server
- `ng build` - Production build

## 🌐 API Endpoints

- `POST /api/customer/register` - User registration
- `POST /api/customer/login` - User login
- `GET /api/product` - Get all products
- `GET /api/cart` - Get user cart
- `POST /api/order` - Create order

## 📝 License

MIT License

---

**Happy Shopping! 🛒** 