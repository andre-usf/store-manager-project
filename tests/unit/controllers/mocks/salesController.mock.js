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

const allSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
]

const saleById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
]

module.exports = {
  validSale,
  validSaleResponse,
  saleWithoutProductId,
  saleWithoutQuantity,
  allSales,
  saleById,
}
