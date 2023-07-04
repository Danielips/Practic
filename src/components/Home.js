import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Фильтрация товаров по выбранной категории
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <h2>Главная страница</h2>
      <div>
        <button onClick={() => filterProductsByCategory('')}>Все товары</button>
        <button onClick={() => filterProductsByCategory('electronics')}>Электроника</button>
        <button onClick={() => filterProductsByCategory('jewelery')}>Украшения</button>
        <button onClick={() => filterProductsByCategory('men\'s clothing')}>Мужская одежда</button>
        <button onClick={() => filterProductsByCategory('women\'s clothing')}>Женская одежда</button>
      </div>
      {isLoading ? (
        <div>Загрузка товаров...</div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default Home;
