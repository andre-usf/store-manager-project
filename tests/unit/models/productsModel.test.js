const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const products = require('./mocks/productsModel.mock');

describe('Testes unitários da camada model referente às rotas dos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  describe('Quando acessada a rota "/products"', function () {
    it('Deve trazer todos os produtos por meio da função "getAll"', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productsModel.getAll();

      expect(result).to.be.deep.equal(products);
    });
  });

  describe('Quando acessada a rota "/products/:id"', function () {
    it('Deve trazer o produto do id correspondente por meio da função "findById"', async function () {
      sinon.stub(connection, 'execute').resolves([products[1]]);

      const result = await productsModel.findById();

      expect(result).to.be.deep.equal(products[1]);
    });
  });
});
