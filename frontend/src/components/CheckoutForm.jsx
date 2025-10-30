"use client"

import { useState } from "react"
import Receipt from "./Receipt"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function CheckoutForm({ cartItems, products, total, onBack }) {
  const [formData, setFormData] = useState({ customerName: "", customerEmail: "" })
  const [loading, setLoading] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.customerName.trim() || !formData.customerEmail.trim()) {
      setError("Please fill in all fields")
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setReceipt(data.data)
      } else {
        setError(data.error || "Checkout failed")
      }
    } catch (err) {
      setError("Error processing checkout")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (receipt) {
    return <Receipt receipt={receipt} onClose={onBack} />
  }

  return (
    <div className="checkout-section">
      <button className="back-btn" onClick={onBack}>
        ← Back to Cart
      </button>
      <h2>Checkout</h2>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Billing Information</h3>
          {error && <div className="form-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail">Email Address</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              return (
                <div key={item.id} className="summary-item">
                  <span>
                    {product?.name} x {item.qty}
                  </span>
                  <span>${(product ? product.price * item.qty : 0).toFixed(2)}</span>
                </div>
              )
            })}
          </div>
          <div className="summary-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
