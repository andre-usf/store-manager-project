const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW()) ',
  );
  
  return insertId;
};

const insertProductSale = async (saleId, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_Id, sale_Id, quantity) VALUE (?, ?, ?)',
    [productId, saleId, quantity],
  );
};

module.exports = {
  insertSales,
  insertProductSale,
};
