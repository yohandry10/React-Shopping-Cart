import React, { useEffect, useState, useRef } from 'react'
import Product from './Product'
import { items } from './Data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FiltersPanel from './FiltersPanel'

const Home = ({cart, setCart, favorites, setFavorites}) => {
  const featuredProducts = items.slice(0,10);

  const [filterBrand, setFilterBrand] = useState("");
  const [priceRange, setPriceRange] = useState("100000");
  const [filteredData, setFilteredData] = useState(items);

  const featuredRef = useRef(null);

  const scrollLeft = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let data = [...items];
    if(filterBrand !== ""){
      data = data.filter(item => item.brand === filterBrand)
    }
    data = data.filter(item => item.price <= parseInt(priceRange,10));
    setFilteredData(data);
  }, [filterBrand, priceRange])

  const addToCartFeatured = (id, price, title, description, imgSrc) => {
    const obj = {id, price, title, description, imgSrc};
    setCart([...cart, obj]);
    toast.success('Item agregado al carrito!', {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="hero-section fade-in">
        <div className="hero-content">
          <h1>Bienvenido a E-Store</h1>
          <p>Encuentra las mejores ofertas en tecnología y más</p>
          <a href="#destacados" className="hero-btn">Ver Ofertas</a>
        </div>
      </div>

      <div className="featured-section fade-in" id="destacados">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="carousel-container" style={{position:'relative', overflow:'hidden'}}>
          <button className="arrow-btn left" onClick={scrollLeft}>&lt;</button>
          <div 
            className="featured-grid" 
            ref={featuredRef} 
            style={{
              display:'flex',
              gap:'20px', 
              padding:'20px 0', 
              scrollBehavior:'smooth', 
              overflowX:'auto', 
              whiteSpace:'nowrap'
            }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="featured-card" style={{display:'inline-block', minWidth:'220px'}}>
                <img src={product.imgSrc} alt={product.title}/>
                <h4>{product.title}</h4>
                <p className="price">{product.price} ₹</p>
                <button 
                  className="btn btn-warning"
                  onClick={()=> addToCartFeatured(product.id, product.price, product.title, product.description, product.imgSrc)}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
          <button className="arrow-btn right" onClick={scrollRight}>&gt;</button>
        </div>
      </div>

      <div className="fade-in" style={{display:'flex', gap:'20px', padding:'20px'}}>
        <FiltersPanel 
          setFilterBrand={setFilterBrand} 
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          setFilteredData={setFilteredData}
        />
        <div style={{flex:1}}>
          <h2 className="section-title">Todos los Productos</h2>
          <Product 
            cart={cart} 
            setCart={setCart} 
            items={filteredData} 
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </div>
      </div>
    </>
  )
}

export default Home
