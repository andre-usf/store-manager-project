const validSale = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const validSaleResponse = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

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

module.exports = {
  validSale,
  validSaleResponse,
  saleWithoutProductId,
  saleWithoutQuantity,
}
