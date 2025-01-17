export const setupDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ShoppingApp', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log('Upgrading database...');
      if (!db.objectStoreNames.contains('products')) {
        const productStore = db.createObjectStore('products', {
          keyPath: 'id',
        });
        productStore.createIndex('description', 'description', {
          unique: false,
        });
        productStore.createIndex('price', 'price', { unique: false });

        // Adding static products
        productStore.transaction.oncomplete = () => {
          const productTransaction = db
            .transaction('products', 'readwrite')
            .objectStore('products');
          productTransaction.add({
            id: 1,
            description: 'Produto A',
            price: 10.0,
          });
          productTransaction.add({
            id: 2,
            description: 'Produto B',
            price: 20.0,
          });
          productTransaction.add({
            id: 3,
            description: 'Produto C',
            price: 30.0,
          });
        };
      }
      if (!db.objectStoreNames.contains('orders')) {
        db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      console.log('Database opened successfully');
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject(event.target.error);
    };
  });
};
