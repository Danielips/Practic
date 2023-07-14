import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const calculateTotalPrice = () => {
    let total = 0;
    for (let item of cart) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  };

  return (
    <div>
      {cart.length === 0 ? (
        <div className='fonttext'>Корзина пуста.</div>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <p>Цена: {item.price}$</p>
              <p>Количество: {item.quantity}шт.</p>
              <button className="btn btn-primary fonttextbold border border-white" style={{ marginRight: '10px' }} onClick={() => removeFromCart(item.id)}>Удалить</button>
              <button className="btn btn-primary fonttextbold border border-white" style={{ marginRight: '10px' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              {item.quantity > 1 && (
                <button className="btn btn-primary fonttextbold border border-white" style={{ marginRight: '10px' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
              )}
            </div>
          ))}
          <p>Итого: {calculateTotalPrice()}$</p>
        </div>
      )}
    </div>
  );
};

export default Cart;