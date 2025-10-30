import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  image: String,
  category: String,
})

const orderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true, required: true },
  customer_name: String,
  customer_email: String,
  total: Number,
  status: { type: String, default: "completed" },
  created_at: { type: Date, default: Date.now },
})

const orderItemSchema = new mongoose.Schema({
  order_id: String,
  product_id: Number,
  product_name: String,
  quantity: Number,
  price: Number,
  subtotal: Number,
})

const Product = mongoose.model("Product", productSchema)
const Order = mongoose.model("Order", orderSchema)
const OrderItem = mongoose.model("OrderItem", orderItemSchema)

export async function initializeDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/"

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to MongoDB")

    // Seed products if collection is empty
    const productCount = await Product.countDocuments()
    if (productCount === 0) {
      const products = [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
          category: "Audio",
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
          category: "Wearables",
        },
        {
          id: 3,
          name: "USB-C Cable",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop",
          category: "Accessories",
        },
        {
          id: 4,
          name: "Phone Stand",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
          category: "Accessories",
        },
        {
          id: 5,
          name: "Portable Charger",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
          category: "Power",
        },
        {
          id: 6,
          name: "Bluetooth Speaker",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
          category: "Audio",
        },
        {
          id: 7,
          name: "Screen Protector",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
          category: "Protection",
        },
        {
          id: 8,
          name: "Phone Case",
          price: 19.99,
          image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=300&h=300&fit=crop",
          category: "Protection",
        },
      ]

      await Product.insertMany(products)
      console.log("Database seeded with products")
    }

    console.log("Database initialized successfully")
    return { Product, Order, OrderItem }
  } catch (error) {
    console.error("Database connection error:", error)
    throw error
  }
}

export { Product, Order, OrderItem }
