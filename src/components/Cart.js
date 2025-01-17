import React from 'react';
import { useCart } from '../context/Cart';
import { setupDatabase } from '../utils/db';

const Cart = () => {
  let dbPromise = setupDatabase();

  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const finalizeOrder = () => {
    dbPromise.then((db) => {
      const transaction = db.transaction('orders', 'readwrite');
      const orderStore = transaction.objectStore('orders');
      orderStore.add({ products: cart, totalPrice: total });

      transaction.oncomplete = () => {
        clearCart();
        alert('Order finalized!');
      };

      transaction.onerror = () => {
        console.error('Failed to finalize order');
      };
    });
  };

  return (
    <div className="cart">
      <h2>Carrinho</h2>
      {!cart.length ? <p>Seu carrinho está vazio</p> : null}
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cart-item">
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>
                R$
                {item.price}
              </td>
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: R${total}</h3>
      <button className="button-primary" onClick={finalizeOrder}>
        Finalizar pedido
      </button>
    </div>
  );
};

export default Cart;
