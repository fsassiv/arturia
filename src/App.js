import React, { useState } from 'react';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import ProductList from './components/ProductList';

const App = () => {
  const [view, setView] = useState('home');

  return (
    <div className="app container">
      <header>
        <h1 style={{ marginBottom: 20, marginTop: 20 }}>Shopping App</h1>
        <nav>
          <button style={{ marginRight: 10 }} onClick={() => setView('home')}>
            Home
          </button>
          <button style={{ marginRight: 10 }} onClick={() => setView('cart')}>
            Carrinho
          </button>
          <button onClick={() => setView('orders')}>Pedidos</button>
        </nav>
      </header>
      <main>
        {view === 'home' && <ProductList />}
        {view === 'cart' && <Cart />}
        {view === 'orders' && <OrderHistory />}
      </main>
    </div>
  );
};

export default App;
