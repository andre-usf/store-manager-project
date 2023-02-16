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

const getSaleById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity 
    FROM StoreManager.sales_products AS sales_products
    INNER JOIN StoreManager.sales AS sales
    ON sales_products.sale_id = sales.id
    WHERE sales_products.sale_id = (?)
    ORDER BY sale_id ASC, product_id ASC`,
    [saleId],
  );
  return sale;
};

const deleteSale = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id = (?)`,
    [saleId],
  );
  return affectedRows;
};

const updateSale = async (saleId, { productId, quantity }) => {
  const [{ changedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET product_id = (?), quantity = (?)
    WHERE sale_id = (?) AND product_id = (?)`,
    [productId, quantity, saleId, productId],
  );
  return changedRows;
};

module.exports = {
  insertSales,
  insertProductSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
