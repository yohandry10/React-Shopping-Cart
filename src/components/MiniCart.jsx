// src/components/MiniCart.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const MiniCart = ({cart}) => {
  const total = cart.reduce((acc, c) => acc + c.price, 0);

  return (
    <div className="mini-cart">
      <h4>Carrito</h4>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>
            <img src={item.imgSrc} alt={item.title} />
            <div>
              <p>{item.title}</p>
              <span>{item.price} ₹</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mini-cart-footer">
        <p>Total: {total} ₹</p>
        <Link to="/cart" className="btn btn-warning btn-sm">Ver Carrito</Link>
      </div>
    </div>
  )
}

export default MiniCart
