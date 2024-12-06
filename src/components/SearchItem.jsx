// src/components/SearchItem.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { items } from './Data';
import Product from './Product';

const SearchItem = ({cart, setCart, favorites, setFavorites}) => {
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const data = items.filter((p) => p.title.toLowerCase().includes(term.toLowerCase()));
    setFilterData(data);
  }, [term]);

  return (
   <Product 
     cart={cart} 
     setCart={setCart} 
     items={filterData} 
     favorites={favorites}
     setFavorites={setFavorites}
   />
  )
}

export default SearchItem
