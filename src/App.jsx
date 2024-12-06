// src/App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductDetail from './components/ProductDetail'
import SearchItem from './components/SearchItem'
import Cart from './components/Cart'
import CategoryPage from './components/CategoryPage'
import PriceFilterPage from './components/PriceFilterPage'
import Home from './components/Home'
import Footer from './components/Footer'

const AppContent = ({ cart, setCart, favorites, setFavorites, darkMode, setDarkMode }) => {
  const location = useLocation();

  return (
    <div className={darkMode ? 'dark-mode' : ''} style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Navbar cart={cart} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/category/:category" element={<CategoryPage cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/price/:minPrice" element={<PriceFilterPage cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
        </Routes>
      </div>
      {location.pathname !== '/cart' && <Footer />}
    </div>
  )
}

const App = () => {
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const favs = localStorage.getItem('favorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  return (
    <Router>
      <AppContent
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </Router>
  )
}

export default App
  