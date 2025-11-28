import React from 'react'
import Slideshow from '../Components/Slideshow'
import ProductCard from '../Components/ProductCard'
const productsData = [
  { name: "Cotton Saree", desc: "Soft, breathable eco-friendly fabric.", image: "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/soft-cotton-weaving-border-saree-8473.jpg", price:50},
  { name: "Silk Scarf", desc: "Elegant handwoven silk scarf.", image: "https://i.pinimg.com/originals/2c/51/99/2c519952444eb333908a571ce6399308.jpg", price: 30 },
  { name: "Woolen Shawl", desc: "Warm, stylish & handcrafted.", image: "https://keralkings.com/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-22-at-19.51.27.jpg", price: 40 },
  { name: "Handloom Craft", desc: "Traditional handloom craft.", image: "https://static.vecteezy.com/system/resources/previews/048/925/205/non_2x/traditional-indian-weaver-crafting-on-handloom-in-village-settingries-photo.jpeg", price: 60 }
]
export default function Products({ addToCart }) {
  return (
    <section 
      className="products" 
      style={{ 

        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#fafafa'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#2f4f4f' }}>
        Featured Products
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <Slideshow images={productsData.map(p => p.image)} />
      </div>
      <div 
        className="product-grid"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {productsData.map((p, i) => (
          <ProductCard
            key={i}
            product={p}
            addToCart={addToCart}
            imageStyle={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }}
            onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'; }}
          />
        ))}
        
      </div>
    </section>
  )
}