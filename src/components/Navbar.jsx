// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import MiniCart from './MiniCart';

const Navbar = ({cart, darkMode, setDarkMode}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("")
  const [priceMenuOpen, setPriceMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);

  const categories = [
    { name: 'Smartphones', path: '/category/smartphones'},
    { name: 'Notebooks', path: '/category/notebooks'},
    { name: 'Tablets', path: '/category/tablets'},
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim() !== ""){
      navigate(`/search/${searchTerm}`)
      setSearchTerm("")
    }
  }

  const handleCartHover = () => {
    if(window.innerWidth > 768) {
      setShowMiniCart(true);
    }
  }

  const handleCartLeave = () => {
    setShowMiniCart(false);
  }

  return (
    <>
      <header className='main-header'>
        <nav className="nav-bar-modern">
          <div className="nav-left">
            <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars />
            </button>
            <Link to={'/'} className="brand">E-Store</Link>
          </div>
          <form onSubmit={handleSubmit} className="search-bar-modern">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder='Search Products...'
            />
          </form>

          <div className="nav-right-actions">
            <button 
              type="button" 
              className="darkmode-toggle" 
              onClick={()=>setDarkMode(!darkMode)}
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <FaSun/> : <FaMoon/>}
            </button>

            <div 
              className="cart-modern" 
              onMouseEnter={handleCartHover} 
              onMouseLeave={handleCartLeave}
            >
              <Link to={'/cart'}>
                <button type="button" className="cart-btn">
                  <BsFillCartCheckFill className="cart-icon" />
                  {cart.length > 0 && (
                    <span className="cart-count-badge">
                      {cart.length}
                    </span>
                  )}
                </button>
              </Link>
              {showMiniCart && cart.length > 0 && (
                <MiniCart cart={cart} />
              )}
            </div>
          </div>
        </nav>

        {/* Menu lateral para móvil */}
        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <h3>Categorías</h3>
              {categories.map((cat,i) => (
                <Link key={i} to={cat.path} onClick={()=>setMenuOpen(false)} className="mobile-menu-item">{cat.name}</Link>
              ))}
              <h3>Price Ranges</h3>
              <Link to="/price/29999" onClick={()=>setMenuOpen(false)} className="mobile-menu-item">Desde ₹29,999</Link>
              <Link to="/price/49999" onClick={()=>setMenuOpen(false)} className="mobile-menu-item">Desde ₹49,999</Link>
              <Link to="/price/69999" onClick={()=>setMenuOpen(false)} className="mobile-menu-item">Desde ₹69,999</Link>
              <Link to="/price/89999" onClick={()=>setMenuOpen(false)} className="mobile-menu-item">Desde ₹89,999</Link>
            </div>
          </div>
        )}

        { location.pathname === '/' && (
          <div className="sub-menu">
            <div className="price-dropdown-container">
              <div 
                className="price-dropdown-trigger" 
                onClick={() => setPriceMenuOpen(!priceMenuOpen)}
              >
                Price Ranges
                <span className={`arrow ${priceMenuOpen ? 'up' : 'down'}`}>&#9660;</span>
              </div>
              {priceMenuOpen && (
                <div className="price-dropdown-menu">
                  <Link to="/price/29999" className="price-dropdown-item">Desde ₹29,999</Link>
                  <Link to="/price/49999" className="price-dropdown-item">Desde ₹49,999</Link>
                  <Link to="/price/69999" className="price-dropdown-item">Desde ₹69,999</Link>
                  <Link to="/price/89999" className="price-dropdown-item">Desde ₹89,999</Link>
                </div>
              )}
            </div>

            <div className="categories-right">
              {categories.map((cat, index) => (
                <Link to={cat.path} key={index} className="submenu-item">{cat.name}</Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar
