const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const salesMock = require('./mocks/salesModel.mock');

describe('Testes unitários da camada model referente às vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando chamada a função "insertSales"', function () {
    it('Deve inserir uma venda e retornar o insertId', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

      const result = await salesModel.insertSales();

      expect(result).to.be.equal(2);
    });
  });

  describe('Quando chamada a função "insertProductSale"', function () {
    it('Deve inserir uma relação de venda e produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.insertProductSale(salesMock.saleId, salesMock.sale[0]);

      expect(result).to.be.equal(1);
    });
  });

  describe('Quando chamada a função "getAllSales"', function () {
    it('Deve retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock.allSales]);

      const result = await salesModel.getAllSales();

      expect(result).to.be.equal(salesMock.allSales);
    });
  });

  describe('Quando chamada a função "getSaleById"', function () {
    it('Deve retornar todos os produtos passados por id', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock.saleById]);

      const result = await salesModel.getSaleById(1);

      expect(result).to.be.equal(salesMock.saleById);
    });
  });

  describe('Quando chamada a função "deleteSale"', function () {
    it('Deve retornar o número de linhas afetadas', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.deleteSale(1);

      expect(result).to.be.equal(1);
    });
  });

  describe('Quando chamada a função "updateSale"', function () {
    it('Deve retornar o número de linhas afetadas', async function () {
      sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);

      const result = await salesModel.updateSale(1, 1, 2);

      expect(result).to.be.equal(1);
    });
  });
});
