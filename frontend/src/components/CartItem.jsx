"use client"

export default function CartItem({ item, product, onRemove }) {
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
