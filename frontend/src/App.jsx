"use client"

import { useState, useEffect } from "react"
import ProductGrid from "./components/ProductGrid"
import Cart from "./components/Cart"
import Header from "./components/Header"
import "./App.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("products")
  const [cartTotal, setCartTotal] = useState(0)

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/products`)
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      } else {
        setError("Failed to load products")
      }
    } catch (err) {
      setError("Error connecting to server. Make sure backend is running on port 5000.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/api/cart`)
      const data = await response.json()
      if (data.success) {
        setCart(data.data.items)
        setCartTotal(data.data.total)
      }
    } catch (err) {
      console.error("Error fetching cart:", err)
    }
  }

  const addToCart = async (productId, qty = 1) => {
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty }),
      })
      const data = await response.json()
      if (data.success) {
        fetchCart()
        setError(null)
      } else {
        setError(data.error || "Failed to add item")
      }
    } catch (err) {
      setError("Error adding to cart")
      console.error(err)
    }
  }

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`${API_URL}/api/cart/${cartItemId}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        fetchCart()
      } else {
        setError(data.error || "Failed to remove item")
      }
    } catch (err) {
      setError("Error removing from cart")
      console.error(err)
    }
  }

  return (
    <div className="app">
      <Header cartCount={cart.length} onCartClick={() => setActiveTab("cart")} />

      {error && <div className="error-banner">{error}</div>}

      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button className={`tab-button ${activeTab === "cart" ? "active" : ""}`} onClick={() => setActiveTab("cart")}>
            Cart ({cart.length})
          </button>
        </div>

        {loading && activeTab === "products" ? (
          <div className="loading">Loading products...</div>
        ) : activeTab === "products" ? (
          <ProductGrid products={products} onAddToCart={addToCart} />
        ) : (
          <Cart
            cartItems={cart}
            products={products}
            total={cartTotal}
            onRemoveItem={removeFromCart}
            onCheckout={() => setActiveTab("checkout")}
          />
        )}
      </div>
    </div>
  )
}
