const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?)',
    [id],
  );
  return result;
};

const insert = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [productName],
  );
  return insertId;
};

const updateProduct = async (productName, productId) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET name = (?)
    WHERE id = (?)`, 
    [productName, productId],
  );
};

module.exports = {
  getAll,
  findById,
  insert,
  updateProduct,
};
