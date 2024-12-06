import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { items } from './Data'
import Product from './Product'

const PriceFilterPage = ({cart, setCart, favorites, setFavorites}) => {
  const { minPrice } = useParams()
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    const priceNum = parseInt(minPrice, 10);
    const data = items.filter((p) => p.price >= priceNum);
    setFilteredItems(data);
  }, [minPrice])

  return (
    <div>
      <h2 className="text-center my-4">Productos desde ₹{minPrice}</h2>
      <Product 
        cart={cart} setCart={setCart} 
        items={filteredItems} 
        favorites={favorites} 
        setFavorites={setFavorites}
      />
    </div>
  )
}

export default PriceFilterPage
