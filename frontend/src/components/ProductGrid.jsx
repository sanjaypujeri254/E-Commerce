import ProductCard from "./ProductCard"

export default function ProductGrid({ products, onAddToCart }) {
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
