const errorMap = {
  ANY_REQUIRED: 400,
  STRING_MIN: 422,
  NUMBER_MIN: 422,
  PRODUCT_NOT_FOUND: 404,
  GET_ALL: 200,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
