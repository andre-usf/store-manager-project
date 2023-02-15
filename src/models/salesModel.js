const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW()) ',
  );
  
  return insertId;
};

const insertProductSale = async (saleId, { productId, quantity }) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_Id, sale_Id, quantity) VALUE (?, ?, ?)',
    [productId, saleId, quantity],
  );
  return affectedRows;
};

module.exports = {
  insertSales,
  insertProductSale,
};
