"use client"

export default function Receipt({ receipt, onClose }) {
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
