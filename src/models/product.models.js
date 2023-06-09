const { connection } = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [products] = await connection.execute(query, [id]);
  return products;
};

const createProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [name]);
  return newProduct.insertId;
};

const editProduct = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [editedProduct] = await connection.execute(query, [name, id]);
  if (editedProduct.affectedRows === 1) return { id, name };
      throw new Error(
        JSON.stringify({
          status: 404,
          message: 'Product not found',
        }),
      );
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [deletedProduct] = await connection.execute(query, [id]);
  if (deletedProduct.affectedRows === 0) throw new Error();
  return 'Product Deleted';
};

const getBySearch = async (q) => {
  const injection = `%${q}%`;
  console.log(injection);
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE (?)';
  const [searchProduct] = await connection.execute(query, [injection]);
    if (searchProduct.length < 1) {
      const allProducts = await getAllProducts();
      return allProducts;
    }
  return searchProduct;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  editProduct,
  deleteProduct,
  getBySearch,
};
