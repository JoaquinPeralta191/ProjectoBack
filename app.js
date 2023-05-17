const express = require('express');
const ProductManager = require('./i.js');

const app = express();
const productManager = new ProductManager('products.json'); 

app.get('/products', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = productManager.getProducts();

  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
