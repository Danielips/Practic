import React, { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import axios from 'axios';
import Cart from './Cart';
import ProductSearch from './ProductSearch';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartModalRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const handleDragStart = (event) => {
    setDragging(true);
    setPosition({
      x: event.clientX - cartModalRef.current.offsetLeft,
      y: event.clientY - cartModalRef.current.offsetTop,
    });
  };

  const handleDrag = (event) => {
    if (dragging) {
      const newX = event.clientX - position.x;
      const newY = event.clientY - position.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleDragEnd =(event) => {
    setDragging(false);
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setIsCartOpen(true);
      setCart(updatedCart);
    } else {
      const productToAdd = products.find((product) => product.id === productId);
      setCart((prevCart) => [...prevCart, { ...productToAdd, quantity: 1 }]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    if (updatedCart.length === 0) {
      setIsCartOpen(false);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const searchedProducts = searchText
    ? filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : filteredProducts;

  return (
    <div>
      <h2>Главная страница</h2>
      <ProductSearch onSearch={handleSearch} />
      <div>
        <button onClick={() => filterProductsByCategory('')}>Все товары</button>
        <button onClick={() => filterProductsByCategory('electronics')}>Электроника</button>
        <button onClick={() => filterProductsByCategory('jewelery')}>Украшения</button>
        <button onClick={() => filterProductsByCategory("men's clothing")}>Мужская одежда</button>
        <button onClick={() => filterProductsByCategory("women's clothing")}>Женская одежда</button>
      </div>
      {isLoading ? (
        <div>Загрузка товаров...</div>
      ) : (
        <>
          <ProductList products={searchedProducts} addToCart={addToCart} />
          {cart.length > 0 && isCartOpen && (
            <div
              className="cart-modal"
              style={{ top: position.y, left: position.x }}
              ref={cartModalRef}
              draggable={!dragging}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              <div className="cart-modal-header">
                <h3 className="cart-modal-title">Корзина</h3>
              </div>
              <div className="cart-modal-content">
                <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
              </div>
              <div className="cart-modal-footer">
                <button onClick={() => setIsCartOpen(false)}>Закрыть</button>
              </div>
              <div
                className="cart-modal-overlay"
                onClick={() => setIsCartOpen(false)}
                draggable={false}
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
