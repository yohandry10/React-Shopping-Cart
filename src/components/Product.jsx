import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ items, cart, setCart, favorites, setFavorites }) => {

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = {id, price, title, description, imgSrc};
    setCart([...cart, obj]);
    toast.success('Item added to cart!', {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
  }

  const toggleFavorite = (id) => {
    if(favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div key={product.id} className="col-lg-4 col-md-6 my-3 text-center">
                <div className="card" style={{ width: "18rem", margin: "0 auto" }}>
                  <div className="card-img-wrapper">
                    <Link to={`/product/${product.id}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height:'200px',
                        overflow:'hidden'
                      }}>
                      <img
                        src={product.imgSrc}
                        className="card-img-top"
                        alt={product.title}
                        style={{objectFit:'contain', maxHeight:'200px'}}
                      />
                    </Link>
                    <button 
                      className={`fav-btn ${isFav ? 'fav-active' : ''}`} 
                      onClick={()=>toggleFavorite(product.id)}
                      title="Agregar a Favoritos"
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary mx-3">
                      {product.price} ₹
                    </button>
                    <button
                      onClick={()=>addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}
                      className="btn btn-warning"
                    >Add To Cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
