import React, { useEffect, useState } from 'react';
import { setupDatabase } from '../utils/db';

const OrderHistory = () => {
  let dbPromise = setupDatabase();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dbPromise.then((db) => {
      const transaction = db.transaction('orders', 'readonly');
      const orderStore = transaction.objectStore('orders');
      const request = orderStore.getAll();

      request.onsuccess = () => {
        console.log('Orders fetched:', request.result);
        setOrders(request.result);
      };

      request.onerror = () => {
        console.error('Failed to fetch orders');
      };
    });
  }, [dbPromise]);

  return (
    <div className="order-history">
      <h2>Historico de pedidos</h2>
      <table class="u-full-width">
        <thead>
          <tr>
            <th>Código do pedido</th>
            <th>Produtos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="order">
              <td>ID do Pedido: {order.id}</td>
              <td>
                <ul>
                  {order.products.map((product) => (
                    <li
                      key={product.id}
                    >{`#${product.id} - ${product.description} - R$ ${product.price} x ${product.quantity}`}</li>
                  ))}
                </ul>
              </td>
              {/* <td>{JSON.stringify(order.products)}</td> */}
              <td>R${order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderHistory;
