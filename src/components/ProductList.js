import React, { useState } from 'react';

const ProductList = ({ products, addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (!products || products.length === 0) {
    return <div>Нет доступных товаров.</div>;
  }

  return (
    <div>
      <h3 className="display-4 text-primary">Список товаров</h3>
      {products.map((product) => (
        <div key={product.id} className="row" style={{ marginTop: '15px' }}>
          <div class="col-md-2">
            <img
              src={product.image}
              class="w-100 h-50 border border-info border-right-0 rounded"
              alt={product.title}
              onClick={() => openModal(product)}
              style={{ cursor: 'pointer' }}
           />
          <button className="btn btn-primary fonttextbold" style={{ marginTop: '6px' }} onClick={() => addToCart(product.id)}>Добавить в корзину</button>
          </div>
          <div class="col-md-6">
          <h4 className='fontH1'>{product.title}</h4>
          <p className='fonttextbold'>Оценка: {product.rating && product.rating.rate}</p>
          <p className='fonttextbold'>Количество отзывов: {product.rating && product.rating.count}</p>
          <p className='fonttextbold'>Цена: {product.price}$</p>
          <p className='fonttextbold'>Категория: {product.category}</p>
          </div>
        </div>
      ))}

{selectedProduct && isModalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" onClick={handleOverlayClick}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ marginTop: '250px' }}>
            <div className="modal-content" style={{ maxHeight: '400px' }}>
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.title}</h5>
                <button  type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body fonttext">
                <p>{selectedProduct.description}</p>
                <p>Цена: {selectedProduct.price}$</p>
                <p>Категория: {selectedProduct.category}</p>
                <p>Оценка: {selectedProduct.rating && selectedProduct.rating.rate}</p>
                <p>Количество отзывов: {selectedProduct.rating && selectedProduct.rating.count}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary fonttextbold" onClick={() => addToCart(selectedProduct.id)}>
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;