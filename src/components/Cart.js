import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const calculateTotalPrice = () => {
    let total = 0;
    for (let item of cart) {
      total += item.price * item.quantity;
    }
    return total;
  };

  return (
    <div>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <div>Корзина пуста.</div>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <p>Цена: {item.price}$</p>
              <p>Количество: {item.quantity}шт.</p>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              {item.quantity > 1 && (
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
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