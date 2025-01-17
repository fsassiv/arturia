import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartContextWrapper from './context/Cart';
import './index.css';
import './styles/normalize.css';
import './styles/skeleton.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartContextWrapper>
      <App />
    </CartContextWrapper>
  </React.StrictMode>
);
