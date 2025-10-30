"use client"

import { useState } from "react"
import CartItem from "./CartItem"
import CheckoutForm from "./CheckoutForm"

export default function Cart({ cartItems, products, total, onRemoveItem, onCheckout }) {
  const [showCheckout, setShowCheckout] = useState(false)

  if (cartItems.length === 0 && !showCheckout) {
    return (
      <div className="cart-section">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-cart-hint">Add some products to get started!</p>
        </div>
      </div>
    )
  }

  if (showCheckout) {
    return (
      <CheckoutForm cartItems={cartItems} products={products} total={total} onBack={() => setShowCheckout(false)} />
    )
  }

  return (
    <div className="cart-section">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              product={products.find((p) => p.id === item.productId)}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
