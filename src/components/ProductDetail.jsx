import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import { FaHeart, FaStar } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ cart, setCart, favorites, setFavorites }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.filter((p) => p.id == id);
    setProduct(filterProduct[0]);

    if(filterProduct[0]) {
      const related = items.filter(
        (item) => item.category === filterProduct[0].category && item.id !== filterProduct[0].id
      );
      setRelatedProducts(related);
    }
  }, [id]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
  };

  const toggleFavorite = (id) => {
    if(favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  if(!product) return null;
  const isFav = favorites.includes(product.id);

  const stars = [1,2,3,4,5]; // ejemplo fijo
  const fakeReviewsCount = 128; // número simulado

  return (
    <>
      <ToastContainer/>
      <div className="container con fade-in">
        <div className="img">
          <img src={product.imgSrc} alt={product.title} />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>

          <div className="rating" style={{margin:'10px 0'}}>
            {stars.map(s => (
              <FaStar key={s} 
                style={{color:'#FFD700', margin:'0 2px', cursor:'pointer'}}
                title={`${fakeReviewsCount} reseñas`}
              />
            ))}
            <span style={{marginLeft:'8px', fontSize:'0.9rem', color:'#666'}}>{fakeReviewsCount} reseñas</span>
          </div>

          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.price,
                product.title,
                product.description,
                product.imgSrc
              )
            }
            className="btn btn-warning"
          >
            Add To Cart
          </button>
          <button 
            className={`btn fav-detail-btn ${isFav ? 'fav-active' : ''}`}
            onClick={()=>toggleFavorite(product.id)}
            style={{marginLeft:'10px'}}
          >
            <FaHeart /> {isFav ? 'En Favoritos' : 'Agregar a Favoritos'}
          </button>
        </div>
      </div>
      {relatedProducts.length > 0 && <h1 className="text-center">Related Products</h1>}
      <Product 
        cart={cart} 
        setCart={setCart} 
        items={relatedProducts} 
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </>
  );
};

export default ProductDetail;
