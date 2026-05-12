import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
  const defaultProducts = [
    { id: 1, name: 'Laptop', price: 999, available: true },
    { id: 2, name: 'Phone', price: 699, available: false },
    { id: 3, name: 'Tablet', price: 499, available: true },
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [filteredProducts, setFilteredProducts] = useState(defaultProducts);
  const [showAll, setShowAll] = useState(true);

  // Fetch products from json-server on mount
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch from server, using default products:', err.message);
        // Keep default products if server is unavailable
      });
  }, []);

  // Filter products based on availability
  const filterProducts = (available) => {
    setShowAll(false);
    setFilteredProducts(
      products.filter((product) => product.available === available)
    );
  };

  // Show all products
  const showAllProducts = () => {
    setShowAll(true);
    setFilteredProducts(products);
  };

  // Remove product from dashboard
  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(
      updatedProducts.filter((product) =>
        showAll ? true : product.available === (filteredProducts[0]?.available ?? true)
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Product Dashboard</h1>
        <p className="subtitle">Manage your product inventory</p>
      </header>

      <div className="filter-controls">
        <button
          className={`filter-btn ${showAll ? 'active' : ''}`}
          onClick={showAllProducts}
        >
          All Products
        </button>
        <button
          className="filter-btn"
          onClick={() => filterProducts(true)}
        >
          ✓ Available
        </button>
        <button
          className="filter-btn"
          onClick={() => filterProducts(false)}
        >
          ✗ Unavailable
        </button>
      </div>

      <ProductList products={filteredProducts} onRemove={removeProduct} />
    </div>
  );
};

export default App;
