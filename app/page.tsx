"use client"

import { useState } from "react"

// Mock products data
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

// Header Component
function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Vibe Commerce</h1>
          <p>Your favorite tech store</p>
        </div>
        <button className="cart-button" onClick={onCartClick}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  )
}

// Product Card Component
function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await onAddToCart(product.id, quantity)
    setQuantity(1)
    setIsAdding(false)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={isAdding}>
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}

// Product Grid Component
function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="products-section">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

// Cart Item Component
function CartItem({ item, product, onRemove }) {
  if (!product) return null

  return (
    <div className="cart-item">
      <img src={product.image || "/placeholder.svg"} alt={product.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{product.name}</h4>
        <p className="cart-item-price">${product.price.toFixed(2)}</p>
        <p className="cart-item-qty">Quantity: {item.qty}</p>
      </div>
      <div className="cart-item-subtotal">
        <p>${(product.price * item.qty).toFixed(2)}</p>
        <button className="remove-btn" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  )
}

// Receipt Component
function Receipt({ receipt, onClose }) {
  return (
    <div className="receipt-modal-overlay">
      <div className="receipt-modal">
        <div className="receipt-header">
          <h2>Order Confirmed!</h2>
          <p className="receipt-subtitle">Thank you for your purchase</p>
        </div>

        <div className="receipt-content">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <div className="receipt-row">
              <span>Order ID:</span>
              <strong>{receipt.orderId}</strong>
            </div>
            <div className="receipt-row">
              <span>Date:</span>
              <span>{new Date(receipt.timestamp).toLocaleString()}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Customer Information</h3>
            <div className="receipt-row">
              <span>Name:</span>
              <span>{receipt.customerName}</span>
            </div>
            <div className="receipt-row">
              <span>Email:</span>
              <span>{receipt.customerEmail}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Items Purchased</h3>
            {receipt.items.map((item, idx) => (
              <div key={idx} className="receipt-item">
                <div className="receipt-item-name">
                  {item.productName} x {item.qty}
                </div>
                <div className="receipt-item-price">${item.subtotal.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="receipt-section receipt-total">
            <div className="receipt-row">
              <strong>Total Amount:</strong>
              <strong className="total-amount">${receipt.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="receipt-footer">
            <p>A confirmation email has been sent to {receipt.customerEmail}</p>
            <p className="receipt-note">Thank you for shopping with Vibe Commerce!</p>
          </div>
        </div>

        <button className="close-receipt-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

// Checkout Form Component
function CheckoutForm({ cartItems, total, onBack, onCheckoutComplete }) {
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

    // Mock checkout - generate receipt
    const mockReceipt = {
      orderId: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
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
      total,
      status: "completed",
    }

    setReceipt(mockReceipt)
  }

  if (receipt) {
    return (
      <Receipt
        receipt={receipt}
        onClose={() => {
          setReceipt(null)
          onCheckoutComplete()
        }}
      />
    )
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

// Cart Component
function Cart({ cartItems, total, onRemoveItem, onCheckout }) {
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
      <CheckoutForm
        cartItems={cartItems}
        total={total}
        onBack={() => setShowCheckout(false)}
        onCheckoutComplete={() => {
          setShowCheckout(false)
          onCheckout()
        }}
      />
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

// Main App Component
export default function Page() {
  const [cart, setCart] = useState([])
  const [activeTab, setActiveTab] = useState("products")
  const [cartTotal, setCartTotal] = useState(0)
  let cartId = 1

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)
      return sum + (product ? product.price * item.qty : 0)
    }, 0)
  }

  const addToCart = (productId, qty = 1) => {
    const existingItem = cart.find((item) => item.productId === productId)
    let newCart
    if (existingItem) {
      newCart = cart.map((item) => (item.productId === productId ? { ...item, qty: item.qty + qty } : item))
    } else {
      newCart = [...cart, { id: cartId++, productId, qty }]
    }
    setCart(newCart)
    setCartTotal(calculateTotal(newCart))
  }

  const removeFromCart = (cartItemId) => {
    const newCart = cart.filter((item) => item.id !== cartItemId)
    setCart(newCart)
    setCartTotal(calculateTotal(newCart))
  }

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --secondary: #ec4899;
          --background: #f8fafc;
          --surface: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border: #e2e8f0;
          --success: #10b981;
          --error: #ef4444;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: var(--background);
          color: var(--text-primary);
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 1.5rem 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .logo p {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .cart-button {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cart-button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          flex: 1;
          width: 100%;
        }

        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--border);
        }

        .tab-button {
          background: none;
          border: none;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          margin-bottom: -2px;
        }

        .tab-button.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        .tab-button:hover {
          color: var(--text-primary);
        }

        .error-banner {
          background-color: #fee2e2;
          color: var(--error);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border-left: 4px solid var(--error);
        }

        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .products-section h2 {
          font-size: 1.875rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .product-card {
          background: var(--surface);
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          transform: translateY(-4px);
        }

        .product-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: var(--background);
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .product-category {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: var(--primary);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .product-info {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-info h3 {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .product-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          overflow: hidden;
        }

        .quantity-selector button {
          background: var(--background);
          border: none;
          width: 2rem;
          height: 2rem;
          cursor: pointer;
          font-weight: 600;
          color: var(--text-primary);
          transition: background 0.2s;
        }

        .quantity-selector button:hover {
          background: var(--border);
        }

        .quantity-selector input {
          width: 2.5rem;
          border: none;
          text-align: center;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .quantity-selector input:focus {
          outline: none;
        }

        .add-to-cart-btn {
          flex: 1;
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .add-to-cart-btn:hover:not(:disabled) {
          background: var(--primary-dark);
        }

        .add-to-cart-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cart-section h2 {
          font-size: 1.875rem;
          margin-bottom: 2rem;
        }

        .empty-cart {
          text-align: center;
          padding: 3rem;
          background: var(--surface);
          border-radius: 0.75rem;
          border: 2px dashed var(--border);
        }

        .empty-cart p {
          font-size: 1.125rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-cart-hint {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .cart-container {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item {
          background: var(--surface);
          border-radius: 0.75rem;
          padding: 1.5rem;
          display: flex;
          gap: 1.5rem;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .cart-item-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .cart-item-details {
          flex: 1;
        }

        .cart-item-details h4 {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        .cart-item-price {
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .cart-item-qty {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .cart-item-subtotal {
          text-align: right;
        }

        .cart-item-subtotal p {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .remove-btn {
          background: var(--error);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .remove-btn:hover {
          background: #dc2626;
        }

        .cart-summary {
          background: var(--surface);
          border-radius: 0.75rem;
          padding: 1.5rem;
          height: fit-content;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .cart-summary h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .summary-row.total {
          border-top: 2px solid var(--border);
          padding-top: 1rem;
          margin-top: 1rem;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.125rem;
        }

        .checkout-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: background 0.3s ease;
        }

        .checkout-btn:hover {
          background: var(--primary-dark);
        }

        .checkout-section {
          max-width: 900px;
          margin: 0 auto;
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .back-btn:hover {
          color: var(--primary-dark);
        }

        .checkout-section h2 {
          font-size: 1.875rem;
          margin-bottom: 2rem;
        }

        .checkout-container {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }

        .checkout-form {
          background: var(--surface);
          border-radius: 0.75rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .checkout-form h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .form-error {
          background-color: #fee2e2;
          color: var(--error);
          padding: 0.75rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          border-left: 4px solid var(--error);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .submit-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--primary-dark);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .checkout-summary {
          background: var(--surface);
          border-radius: 0.75rem;
          padding: 1.5rem;
          height: fit-content;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .checkout-summary h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .summary-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .summary-total {
          text-align: right;
          font-size: 1.125rem;
          color: var(--primary);
        }

        .receipt-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .receipt-modal {
          background: var(--surface);
          border-radius: 1rem;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
        }

        .receipt-header {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .receipt-header h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .receipt-subtitle {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .receipt-content {
          padding: 2rem;
        }

        .receipt-section {
          margin-bottom: 2rem;
        }

        .receipt-section h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .receipt-row span {
          color: var(--text-secondary);
        }

        .receipt-row strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .receipt-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.875rem;
        }

        .receipt-item-name {
          color: var(--text-primary);
        }

        .receipt-item-price {
          color: var(--primary);
          font-weight: 600;
        }

        .receipt-total {
          background: var(--background);
          padding: 1rem;
          border-radius: 0.5rem;
          border: 2px solid var(--border);
        }

        .total-amount {
          color: var(--primary);
          font-size: 1.25rem;
        }

        .receipt-footer {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .receipt-footer p {
          margin-bottom: 0.5rem;
        }

        .receipt-note {
          color: var(--primary);
          font-weight: 600;
        }

        .close-receipt-btn {
          width: calc(100% - 4rem);
          margin: 2rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .close-receipt-btn:hover {
          background: var(--primary-dark);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }

          .cart-container,
          .checkout-container {
            grid-template-columns: 1fr;
          }

          .cart-item {
            flex-direction: column;
            text-align: center;
          }

          .cart-item-image {
            width: 150px;
            height: 150px;
          }

          .cart-item-subtotal {
            text-align: center;
            width: 100%;
          }

          .tabs {
            flex-wrap: wrap;
          }

          .tab-button {
            padding: 0.75rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 1rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .product-card {
            flex-direction: row;
          }

          .product-image {
            width: 120px;
            height: 120px;
            flex-shrink: 0;
          }

          .product-info {
            padding: 1rem;
          }

          .product-actions {
            flex-direction: column;
          }

          .logo h1 {
            font-size: 1.25rem;
          }

          .cart-button {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>

      <Header cartCount={cart.length} onCartClick={() => setActiveTab("cart")} />

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

        {activeTab === "products" ? (
          <ProductGrid products={products} onAddToCart={addToCart} />
        ) : (
          <Cart
            cartItems={cart}
            total={cartTotal}
            onRemoveItem={removeFromCart}
            onCheckout={() => setActiveTab("products")}
          />
        )}
      </div>
    </div>
  )
}
