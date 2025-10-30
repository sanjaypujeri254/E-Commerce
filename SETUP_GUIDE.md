# Vibe Commerce - Complete Setup Guide

## Prerequisites

Before starting, ensure you have:
- **Node.js 16+** - Download from https://nodejs.org/
- **npm 8+** - Comes with Node.js
- **Git** - Download from https://git-scm.com/
- **Code Editor** - VS Code recommended (https://code.visualstudio.com/)

## Step-by-Step Setup

### Step 1: Clone or Download the Repository

**Option A: Using Git**
\`\`\`bash
git clone https://github.com/yourusername/vibe-commerce.git
cd vibe-commerce
\`\`\`

**Option B: Download ZIP**
1. Click "Code" → "Download ZIP"
2. Extract the ZIP file
3. Open terminal in the extracted folder

### Step 2: Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
\`\`\`

**Expected Output:**
\`\`\`
Server running on http://localhost:5000
Database initialized successfully
Database seeded with products
\`\`\`

✅ Backend is ready when you see these messages.

### Step 3: Frontend Setup (New Terminal)

\`\`\`bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
\`\`\`

**Expected Output:**
\`\`\`
VITE v4.3.9  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
\`\`\`

✅ Frontend is ready when you see the local URL.

### Step 4: Open the App

1. Click the link shown in terminal: `http://localhost:5173/`
2. Or manually open your browser and go to `http://localhost:5173/`
3. You should see the Vibe Commerce homepage with 8 products

## Testing the Application

### Test 1: Browse Products
- [ ] See 8 products displayed in a grid
- [ ] Each product shows name, price, and image
- [ ] Products have category tags

### Test 2: Add to Cart
- [ ] Click on a product
- [ ] Adjust quantity using +/- buttons
- [ ] Click "Add to Cart"
- [ ] Cart count in header increases
- [ ] See success message (no error banner)

### Test 3: View Cart
- [ ] Click "Cart" tab or cart button in header
- [ ] See all added items with quantities
- [ ] See total price calculation
- [ ] Remove button works for each item

### Test 4: Checkout
- [ ] Click "Proceed to Checkout"
- [ ] Enter your name and email
- [ ] Click "Complete Purchase"
- [ ] See order confirmation modal
- [ ] Order ID and timestamp are displayed
- [ ] All items are listed with prices

### Test 5: Database Persistence
- [ ] Complete a checkout
- [ ] Stop the backend server (Ctrl+C)
- [ ] Restart the backend: `npm run dev`
- [ ] Check that order is still in database
- [ ] Run: `sqlite3 vibe_commerce.db "SELECT * FROM orders;"`

## Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:**
\`\`\`bash
cd backend
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Issue: "Port 5000 already in use"
**Solution:**
\`\`\`bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=5001 npm run dev
\`\`\`

### Issue: "CORS error" in browser console
**Solution:**
- Ensure backend is running on `http://localhost:5000`
- Check frontend `.env` file has correct `VITE_API_URL`
- Restart both servers

### Issue: Frontend shows "Error connecting to server"
**Solution:**
1. Check backend is running: `http://localhost:5000/api/health`
2. Should return: `{"status":"ok"}`
3. If not, restart backend with: `npm run dev`

### Issue: Database errors
**Solution:**
\`\`\`bash
# Reset database
cd backend
rm vibe_commerce.db

# Restart backend
npm run dev
\`\`\`

## File Structure Explanation

\`\`\`
backend/
├── server.js          # Main Express server with all API routes
├── database.js        # SQLite setup, initialization, and seeding
└── package.json       # Dependencies: express, cors, sqlite, sqlite3

frontend/
├── src/
│   ├── App.jsx        # Main app component, state management
│   ├── App.css        # All styling (responsive design)
│   ├── components/    # Reusable React components
│   │   ├── Header.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── CheckoutForm.jsx
│   │   └── Receipt.jsx
│   └── main.jsx       # React entry point
├── index.html         # HTML template
├── vite.config.js     # Vite build configuration
└── package.json       # Dependencies: react, react-dom, vite
\`\`\`

## API Testing with cURL

### Get All Products
\`\`\`bash
curl http://localhost:5000/api/products
\`\`\`

### Add Item to Cart
\`\`\`bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "qty": 2}'
\`\`\`

### Get Cart
\`\`\`bash
curl http://localhost:5000/api/cart
\`\`\`

### Checkout
\`\`\`bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartItems": [{"productId": 1, "qty": 2}],
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }'
\`\`\`

### Get All Orders
\`\`\`bash
curl http://localhost:5000/api/orders
\`\`\`

## Next Steps

1. **Customize Products**: Edit `backend/database.js` to add your own products
2. **Add Authentication**: Implement user login/signup
3. **Add Payment**: Integrate Stripe or PayPal
4. **Deploy**: Push to GitHub and deploy to Vercel
5. **Record Demo**: Create a 1-2 minute demo video

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Vite Documentation](https://vitejs.dev/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Happy coding! 🚀**
