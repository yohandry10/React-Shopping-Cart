// src/components/FiltersPanel.jsx
import React, { useState } from 'react'

const FiltersPanel = ({ setFilterBrand, setPriceRange, priceRange, setFilteredData }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const brands = ['Apple', 'Lenovo', 'Xiaomi', 'Samsung'];

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setFilterBrand(e.target.value);
  }

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  }

  return (
    <div className="filters-panel">
      <h4>Filtros Avanzados</h4>

      <div className="filter-group">
        <label><b>Marca:</b></label>
        <select value={selectedBrand} onChange={handleBrandChange}>
          <option value="">Todas</option>
          {brands.map((b,i)=><option key={i} value={b}>{b}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label><b>Precio Máx: </b>{priceRange}₹</label>
        <input 
          type="range" 
          min="10000" 
          max="100000" 
          step="10000"
          value={priceRange}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  )
}

export default FiltersPanel
