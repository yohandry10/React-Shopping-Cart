import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Product from './Product';
import { FaFilter } from 'react-icons/fa';

const CategoryPage = ({cart, setCart, favorites, setFavorites}) => {
  const { category } = useParams();
  const [filteredItems, setFilteredItems] = useState([]);
  const [priceRange, setPriceRange] = useState(100000);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let data = items.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    
    // Apply price filter
    data = data.filter(item => item.price <= priceRange);
    
    // Apply sorting
    switch(sortBy) {
      case 'price-asc':
        data.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        data.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // featured - no additional sorting
        break;
    }
    
    setFilteredItems(data);
  }, [category, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{category}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-600" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-3 py-2 bg-white"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Precio máximo: S/ {priceRange}</span>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-48"
              />
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <Product 
            cart={cart}
            setCart={setCart}
            items={filteredItems}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No se encontraron productos en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;