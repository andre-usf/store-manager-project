const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const salesMock = require('./mocks/salesModel.mock');

describe('Testes unitários da camada model referente às rotas de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando acessada a rota POST "/sales"', function () {
    it('Deve deve inserir uma venda por meio da função "insertSales" e retornar o insertId', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2}]);

      const result = await salesModel.insertSales();

      expect(result).to.be.equal(2);
    });

    it('Deve deve inserir uma relação de venda e produto por meio da função "insertProductSale"', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.insertProductSale(salesMock.saleId, salesMock.sales[0]);

      expect(result).to.be.equal(1);
    });

    it('Deve trazer todos os produtos por meio da função "getAllSales"', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock.allSales]);

      const result = await salesModel.getAllSales();

      expect(result).to.be.equal(salesMock.allSales);
    });

    it('Deve trazer todos o produto passado por id por meio da função "getSaleById"', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock.saleById]);

      const result = await salesModel.getSaleById(1);

      expect(result).to.be.equal(salesMock.saleById);
    });
  });
});