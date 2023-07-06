import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <h3>Поиск товаров</h3>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Введите название товара"
      />
    </div>
  );
};

export default ProductSearch;
