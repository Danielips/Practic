import React, { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import axios from 'axios';
import Cart from './Cart';
import ProductSearch from './ProductSearch';
import Header from './Header'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartModalRef = useRef(null);

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
    <div className="home">
      <div class="container-fluid border-bottom bg-primary text-white p-3 sticky-top">
        <Header/>
        <ProductSearch onSearch={handleSearch} />
        <div className='fonttext' style={{ marginTop: '10px' }}>
          <button className="btn btn-primary fonttextbold border border-white" style={{ marginRight: '10px' }} onClick={() => filterProductsByCategory('')}>Все товары</button>
          <button className="btn btn-primary fonttextbold border border-white" style={{ marginRight: '10px' }} onClick={() => filterProductsByCategory('electronics')}>Электроника</button>
          <button className="btn btn-primary fonttextbold border border-white" style={{ marginRight: '10px' }} onClick={() => filterProductsByCategory('jewelery')}>Украшения</button>
          <button className="btn btn-primary fonttextbold border border-white" style={{ marginRight: '10px' }} onClick={() => filterProductsByCategory("men's clothing")}>Мужская одежда</button>
          <button className="btn btn-primary fonttextbold border border-white" onClick={() => filterProductsByCategory("women's clothing")}>Женская одежда</button>
        </div>
      </div>
      {isLoading ? (
        <div className='fonttext'>Загрузка товаров...</div>
      ) : (
        <div class="container-fluid row"  style={{ marginTop: '10px' }}>
          <div class="col-md-8 fonttext">
            <ProductList products={searchedProducts} addToCart={addToCart} />
          </div>
          <div class="col-md-4">
            {cart.length > 0 && isCartOpen && (
              <div className="cart-modal" ref={cartModalRef}>
                <div className="cart-modal-header">
                  <h3 className="cart-modal-title">Корзина</h3>
                </div>
                <div className="cart-modal-content">
                  <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                </div>
                <div className="cart-modal-footer">
                  <button className="btn btn-primary fonttextbold border border-white" onClick={() => setIsCartOpen(false)}>Закрыть</button>
                </div>
                <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;