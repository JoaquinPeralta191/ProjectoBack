const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path;
    this.createFileIfNotExists();
  }

  createFileIfNotExists() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, '[]', 'utf-8');
        console.log(`Created empty file: ${this.path}`);
      }
    } catch (error) {
      console.error('Error creating file:', error);
    }
  }

  addProduct(product) {
    try {
      const products = this.getProducts();
      product.id = products.length +1;
      products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8');
      console.log('Product added:', product);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }

  getProductById(id) {
    try {
      const products = this.getProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error('Error getting product by id:', error);
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    try {
      const products = this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
      }
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8');
      console.log('Product updated:', updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  deleteProduct(id) {
    try {
      const products = this.getProducts();
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(updatedProducts), 'utf-8');
      console.log(`Product with id ${id} deleted`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager('products.json');
productManager.addProduct({
  title: 'Producto de prueba',
  description: 'Este es un producto de prueba',
  price: 10.99,
  thumbnail: 'https://example.com/product.jpg',
  code: 'PRUEBA123',
  stock: 5,
});
productManager.addProduct({
    title: 'Producto de prueba2',
    description: 'Este es un producto de prueba2',
    price: 10.99,
    thumbnail: 'https://example.com/product.jpg',
    code: 'PRUEBA1234',
    stock: 5,
  });
console.log(productManager.getProducts());
productManager.updateProduct(1, { price: 12.99 });
console.log(productManager.getProducts());
productManager.deleteProduct(1);
console.log(productManager.getProducts());

module.exports = ProductManager;