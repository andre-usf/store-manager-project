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

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, 
    quantity FROM StoreManager.sales_products AS sales_products
    INNER JOIN StoreManager.sales AS sales
    ON sales_products.sale_id = sales.id
    ORDER BY sale_id ASC, product_id ASC`,
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity 
    FROM StoreManager.sales_products AS sales_products
    INNER JOIN StoreManager.sales AS sales
    ON sales_products.sale_id = sales.id
    WHERE sales_products.sale_id = (?)
    ORDER BY sale_id ASC, product_id ASC`,
    [id],
  );
  console.log(sale);
  return sale;
};

module.exports = {
  insertSales,
  insertProductSale,
  getAllSales,
  getSaleById,
};
