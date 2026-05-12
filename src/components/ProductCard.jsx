import React from 'react';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, onRemove }) => {
  return (
    <div
      className={`${product.available ? styles.productCard : styles.outOfStockClass} ${
        !product.available ? 'outOfStockClass' : ''
      }`}
    >
      <h2 className={styles.productName}>{product.name}</h2>
      <span className={product.available ? styles.badgeIn : styles.badgeOut}>
        {product.available ? 'In Stock' : 'Out of Stock'}
      </span>

      <p className={styles.price}>${product.price.toFixed(2)}</p>

      <button
        className={styles.removeBtn}
        onClick={() => onRemove(product.id)}
        aria-label={`Remove ${product.name}`}
      >
        Remove
      </button>
    </div>
  );
};

export default ProductCard;
