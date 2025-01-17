import React, { useEffect, useState } from 'react';
import { useCart } from '../context/Cart';
import { setupDatabase } from '../utils/db';

const ProductList = () => {
  let dbPromise = setupDatabase();

  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    dbPromise.then((db) => {
      const transaction = db.transaction('products', 'readonly');
      const productStore = transaction.objectStore('products');
      const request = productStore.getAll();

      request.onsuccess = () => {
        setProducts(request.result);
      };

      request.onerror = () => {
        console.error('Failed to fetch products');
      };
    });
  }, [dbPromise]);

  return (
    <div className="product-list">
      <h2 style={{ marginBottom: 20, marginTop: 20 }}>Catalogo de produtos</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="product">
            <p>Descrição: {product.description}</p>
            <p>Preço: R${product.price}</p>
            <button
              className="button-primary"
              onClick={() => addToCart(product)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
