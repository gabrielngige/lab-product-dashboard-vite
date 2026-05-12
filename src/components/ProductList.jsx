import React from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/ProductCard.module.css';

const ProductList = ({ products, onRemove }) => {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default ProductList;
