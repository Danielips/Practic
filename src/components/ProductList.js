import React from 'react';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>Нет доступных товаров.</div>;
  }

  return (
    <div>
      <h3>Список товаров</h3>
      {products.map((product) => (
        <div key={product.id}>
          <h4>{product.title}</h4>
          <p>{product.description}</p>
          <p>Цена: {product.price}</p>
          <p>Категория: {product.category}</p>
          <img src={product.image} alt={product.title} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
