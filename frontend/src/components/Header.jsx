"use client"

export default function Header({ cartCount, onCartClick }) {
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
