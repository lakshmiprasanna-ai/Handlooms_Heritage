import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import AdminTool from './pages/AdminTool';
import UserLogin from './pages/UserLogin';

function App() {

  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (i) => {
    const updatedCart = cart.filter((_, idx) => idx !== i);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />

        <Route
          path="/cart"
          element={
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart} 
              clearCart={clearCart} 
            />
          }
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminTool />} />
        <Route path="/user" element={<UserLogin />} />
      </Routes>
    </>
  );
}

export default App;
