import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className='fonttext'>
      <h3 className='fonttextbold'>Поиск товаров</h3>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default ProductSearch;
