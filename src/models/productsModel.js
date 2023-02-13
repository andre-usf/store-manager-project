const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * StoreManager.products WHERE id = (?)',
    [id],
  );
  return result;
};

module.exports = {
  getAll,
  findById,
};
