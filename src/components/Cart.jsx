import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = ({cart, setCart}) => {
  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    const item = newCart[index];
    const newQuantity = (item.quantity || 1) + delta;
    
    if (newQuantity < 1) {
      newCart.splice(index, 1);
    } else {
      newCart[index] = {...item, quantity: newQuantity};
    }
    
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
          <Link 
            to="/" 
            className="inline-block bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-md
                     hover:bg-yellow-500 transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Tu Carrito</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cart.map((product, index) => (
            <div 
              key={index} 
              className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
            >
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={product.imgSrc} 
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(index, -1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="px-4 py-2 border-x">
                        {product.quantity || 1}
                      </span>
                      <button 
                        onClick={() => updateQuantity(index, 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  
                  <div className="text-lg font-bold text-blue-600">
                    S/ {product.price * (product.quantity || 1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-blue-600">S/ {calculateTotal()}</span>
          </div>
          
          <div className="flex justify-between gap-4">
            <button 
              onClick={() => setCart([])}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600
                       transition-colors font-semibold"
            >
              Limpiar Carrito
            </button>
            <button 
              className="flex-1 px-6 py-3 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500
                       transition-colors font-semibold"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;