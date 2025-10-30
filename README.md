# Vibe Commerce - Full Stack E-Commerce Cart App

A production-ready full-stack shopping cart application built with React, Express, and MongoDB. This project demonstrates core e-commerce functionality including product browsing, cart management, checkout processing, and order persistence.

## 🎯 Project Overview

Vibe Commerce is a complete e-commerce solution featuring:
- **8 Mock Products** with images and categories
- **Shopping Cart** with add/remove/quantity management
- **Checkout Flow** with customer information collection
- **Order Persistence** using MongoDB database
- **Responsive Design** optimized for all devices
- **Error Handling** with user-friendly feedback
- **REST API** for all backend operations

## 📁 Project Structure

\`\`\`
vibe-commerce/
├── backend/
│   ├── server.js              # Express server & API routes
│   ├── database.js            # MongoDB setup & Mongoose models
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   └── Receipt.jsx
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Styling
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── .env.example           # Environment variables template
│   └── .gitignore
├── .gitignore
└── README.md
\`\`\`

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Frontend Build** | Vite | 4.3.9 |
| **Styling** | CSS3 | - |
| **Backend** | Node.js + Express | 4.18.2 |
| **Database** | MongoDB + Mongoose | 8.0.0 |
| **API** | REST | - |

## 📋 Requirements

- Node.js 16+ and npm 8+
- MongoDB (local or MongoDB Atlas cloud)
- Git (for version control)
- A code editor (VS Code recommended)

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/vibe-commerce.git
cd vibe-commerce
\`\`\`

### 2. MongoDB Setup

#### Option A: Local MongoDB
\`\`\`bash
# Install MongoDB Community Edition
# macOS: brew install mongodb-community
# Windows: Download from https://www.mongodb.com/try/download/community
# Linux: Follow official MongoDB installation guide

# Start MongoDB service
# macOS: brew services start mongodb-community
# Windows: MongoDB should start automatically
# Linux: sudo systemctl start mongod
\`\`\`

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/vibe-commerce`
5. Use this in your `.env` file

### 3. Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your MongoDB URI
# For local: MONGODB_URI=mongodb://localhost:27017/vibe-commerce
# For Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibe-commerce

# Start the server (development mode with auto-reload)
npm run dev
\`\`\`

The backend will start on `http://localhost:5000`

**First run**: The database will be automatically initialized and seeded with 8 products.

### 4. Frontend Setup (in a new terminal)

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
\`\`\`

The frontend will open at `http://localhost:5173`

## 📡 API Endpoints

### Products
\`\`\`
GET /api/products
Response: { success: true, data: [{ id, name, price, image, category }, ...] }
\`\`\`

### Cart Management
\`\`\`
GET /api/cart
Response: { success: true, data: { items: [...], total: number, itemCount: number } }

POST /api/cart
Body: { productId: number, qty: number }
Response: { success: true, data: [...] }

DELETE /api/cart/:id
Response: { success: true, data: [...] }
\`\`\`

### Checkout
\`\`\`
POST /api/checkout
Body: { cartItems: [...], customerName: string, customerEmail: string }
Response: { success: true, data: { orderId, timestamp, items, total, ... } }
\`\`\`

### Orders (Bonus)
\`\`\`
GET /api/orders
Response: { success: true, data: [{ order_id, customer_name, total, created_at, ... }, ...] }
\`\`\`

## ✨ Features

### Core Features
- ✅ Product grid with 8 mock items
- ✅ Add/remove items from cart
- ✅ Real-time cart total calculation
- ✅ Quantity management
- ✅ Checkout form with validation
- ✅ Mock receipt generation with order ID
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Error handling and user feedback

### Bonus Features
- ✅ MongoDB database persistence
- ✅ Order history tracking
- ✅ Product images from Unsplash
- ✅ Category tags for products
- ✅ Order items stored with full details
- ✅ Timestamp tracking for orders
- ✅ CORS enabled for frontend-backend communication
- ✅ Comprehensive error messages
- ✅ Mongoose schema validation

## 🎨 Design Highlights

- **Color Scheme**: Indigo primary (#6366f1), pink accent (#ec4899), neutral grays
- **Typography**: System fonts for optimal performance
- **Layout**: Flexbox-based responsive grid
- **Interactions**: Smooth transitions and hover effects
- **Accessibility**: Semantic HTML, proper form labels, alt text for images

## 🧪 Testing the App

### Test Flow
1. **Browse Products**: View all 8 products on the home page
2. **Add to Cart**: Select quantity and add items
3. **View Cart**: See items, quantities, and running total
4. **Checkout**: Enter name and email
5. **Confirm**: View order receipt with order ID and timestamp
6. **Verify**: Check MongoDB for persisted order

### Test Data
- Products are pre-seeded in the database on first run
- Orders are saved to MongoDB
- Cart is in-memory (clears on page refresh)

## 📊 Database Schema

### Products Collection
\`\`\`javascript
{
  id: Number,
  name: String,
  price: Number,
  image: String,
  category: String
}
\`\`\`

### Orders Collection
\`\`\`javascript
{
  order_id: String (unique),
  customer_name: String,
  customer_email: String,
  total: Number,
  status: String (default: 'completed'),
  created_at: Date (default: current timestamp)
}
\`\`\`

### Order Items Collection
\`\`\`javascript
{
  order_id: String,
  product_id: Number,
  product_name: String,
  quantity: Number,
  price: Number,
  subtotal: Number
}
\`\`\`

## 🐛 Error Handling

The app includes comprehensive error handling:
- **Network Errors**: User-friendly messages when backend is unavailable
- **Validation Errors**: Form validation with clear feedback
- **API Errors**: Proper HTTP status codes and error messages
- **Database Errors**: Graceful error handling with logging
- **MongoDB Connection Errors**: Clear messages if database connection fails

## 🚢 Deployment

### Deploy to GitHub
\`\`\`bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Vibe Commerce e-commerce app with MongoDB"

# Add remote
git remote add origin https://github.com/yourusername/vibe-commerce.git

# Push to GitHub
git push -u origin main
\`\`\`

### Deploy Backend to Vercel
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy from backend directory
cd backend
vercel
\`\`\`

**Important**: Add your MongoDB URI to Vercel environment variables:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add `MONGODB_URI` with your MongoDB Atlas connection string

### Deploy Frontend to Vercel
\`\`\`bash
# Deploy from frontend directory
cd frontend
vercel
\`\`\`

## 📹 Demo Video

To create a demo video:
1. Start both backend and frontend servers
2. Record your screen using Loom or OBS
3. Show:
   - Product browsing
   - Adding items to cart
   - Viewing cart
   - Checkout process
   - Receipt confirmation
4. Upload to YouTube (unlisted) or Loom
5. Add link to this README

## 🔧 Troubleshooting

### Backend won't start
- Ensure Node.js 16+ is installed: `node --version`
- Check if port 5000 is available
- Delete `node_modules` and run `npm install` again

### MongoDB connection error
- **Local MongoDB**: Ensure MongoDB service is running
  - macOS: `brew services list` to check status
  - Windows: Check Services app for MongoDB
  - Linux: `sudo systemctl status mongod`
- **MongoDB Atlas**: Verify connection string in `.env`
  - Check username and password are correct
  - Ensure IP address is whitelisted in Atlas
  - Test connection string in MongoDB Compass

### Frontend won't connect to backend
- Verify backend is running on `http://localhost:5000`
- Check `frontend/.env` has correct `VITE_API_URL`
- Check browser console for CORS errors

### Database errors
- Check MongoDB connection logs in terminal
- Verify database name in connection string
- For Atlas, check network access and IP whitelist

## 📝 Environment Variables

### Backend (.env)
\`\`\`
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
\`\`\`

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:5000
\`\`\`

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack JavaScript development
- REST API design and implementation
- React component architecture
- State management with hooks
- MongoDB database design with Mongoose
- Error handling and validation
- Responsive web design
- CORS and frontend-backend communication
- Cloud database integration (MongoDB Atlas)

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Review server logs
5. Verify MongoDB connection

---

**Built with ❤️ for Vibe Commerce Screening**
