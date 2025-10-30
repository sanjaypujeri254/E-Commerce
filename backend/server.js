import express from "express"
import cors from "cors"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { initializeDatabase, Product, Order, OrderItem } from "./database.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Mock database for cart (in-memory)
let cart = []
let cartId = 1

// Initialize database on startup
;(async () => {
  await initializeDatabase()
})()

// GET /api/products - Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/cart - Get cart with total
app.get("/api/cart", async (req, res) => {
  try {
    const products = await Product.find()

    const total = cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)
      return sum + (product ? product.price * item.qty : 0)
    }, 0)

    res.json({
      success: true,
      data: {
        items: cart,
        total: Number.parseFloat(total.toFixed(2)),
        itemCount: cart.reduce((sum, item) => sum + item.qty, 0),
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST /api/cart - Add item to cart
app.post("/api/cart", async (req, res) => {
  try {
    const { productId, qty } = req.body

    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ success: false, error: "Invalid productId or quantity" })
    }

    const product = await Product.findOne({ id: productId })

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    const existingItem = cart.find((item) => item.productId === productId)
    if (existingItem) {
      existingItem.qty += qty
    } else {
      cart.push({ id: cartId++, productId, qty })
    }

    res.json({ success: true, data: cart })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// DELETE /api/cart/:id - Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  try {
    const { id } = req.params
    const index = cart.findIndex((item) => item.id === Number.parseInt(id))

    if (index === -1) {
      return res.status(404).json({ success: false, error: "Cart item not found" })
    }

    cart.splice(index, 1)
    res.json({ success: true, data: cart })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST /api/checkout - Mock checkout with database persistence
app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems, customerName, customerEmail } = req.body

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, error: "Cart is empty" })
    }

    if (!customerName || !customerEmail) {
      return res.status(400).json({ success: false, error: "Customer name and email required" })
    }

    const products = await Product.find()

    const total = cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)
      return sum + (product ? product.price * item.qty : 0)
    }, 0)

    const orderId = `ORD-${Date.now()}`

    // Save order to database
    const order = await Order.create({
      order_id: orderId,
      customer_name: customerName,
      customer_email: customerEmail,
      total: Number.parseFloat(total.toFixed(2)),
      status: "completed",
    })

    // Save order items
    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        await OrderItem.create({
          order_id: orderId,
          product_id: item.productId,
          product_name: product.name,
          quantity: item.qty,
          price: product.price,
          subtotal: product.price * item.qty,
        })
      }
    }

    const receipt = {
      orderId,
      timestamp: new Date().toISOString(),
      customerName,
      customerEmail,
      items: cartItems.map((item) => {
        const product = products.find((p) => p.id === item.productId)
        return {
          productId: item.productId,
          productName: product?.name,
          qty: item.qty,
          price: product?.price,
          subtotal: product ? product.price * item.qty : 0,
        }
      }),
      total: Number.parseFloat(total.toFixed(2)),
      status: "completed",
    }

    // Clear cart after checkout
    cart = []
    cartId = 1

    res.json({ success: true, data: receipt })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/orders - Get all orders (bonus endpoint)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ created_at: -1 })
    const orderDetails = []

    for (const order of orders) {
      const items = await OrderItem.find({ order_id: order.order_id })
      orderDetails.push({
        ...order.toObject(),
        items: items.map((item) => `${item.product_name} x${item.quantity}`).join(", "),
      })
    }

    res.json({ success: true, data: orderDetails })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
