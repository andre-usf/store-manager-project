const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const products = require('./mocks/productsService.mock');

describe('Testes unitários da camada service referente às rotas dos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando acessada a rota "/products"', function () {
    it('Deve trazer todos os produtos por meio da função "getAll"', async function () {
      sinon.stub(productsModel, 'getAll').resolves(products);

      const result = await productsService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.result).to.be.deep.equal(products);
    });
  });

  describe('Quando acessada a rota "/products/:id" ', function () {
    it('Deve trazer o produto do id correspondente se o produto existir', async function () {
      sinon.stub(productsModel, 'findById').resolves(products[1]);

      const result = await productsService.findById(2);

      expect(result.type).to.be.equal(null);
      expect(result.result).to.be.deep.equal(products[1]);
    });
    it('Deve trazer a mensagem "message": "Product not found" se o produto não existir', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.findById(3);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.result.message).to.be.equal("Product not found");
    });
  });
});
