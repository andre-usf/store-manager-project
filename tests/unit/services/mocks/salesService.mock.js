const validSales = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const saleWithoutProductId = [
  {
    productId: 1,
    quantity: 1
  },
  {
    quantity: 5
  }
];

const saleWithoutQuantity = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2
  }
];

const saleZeroQuantity = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 1,
    quantity: 0
  }
];

const nonexistentProductId = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 11,
    quantity: 1
  }
];

const findByIdResult = { type: null, result: '' };

module.exports = {
  validSales,
  saleWithoutProductId,
  saleWithoutQuantity,
  saleZeroQuantity,
  nonexistentProductId,
  findByIdResult,
};
