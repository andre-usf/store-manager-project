const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const salesMock = require('./mocks/salesService.mock');
const productsService = require('../../../src/services/productsService');

describe('Testes unitários da camada service referente às rotas das vendas - POST /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando acessada a rota POST "/sales"', function () {
    it('Deve criar uma venda por meio da função "createSales" e retornar o id da venda e esta for válida', async function () {
      sinon.stub(productsService, 'findById').resolves(salesMock.findByIdResult);
      sinon.stub(salesModel, 'insertSales').resolves(1);
      sinon.stub(salesModel, 'insertProductSale').resolves(1);

      const result = await salesService.createSales(salesMock.validSales);

      expect(result.type).to.be.equal(null);
      expect(result.result).to.be.deep.equal(1);
    });
  });
});