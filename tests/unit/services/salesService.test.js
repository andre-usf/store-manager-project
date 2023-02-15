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
    it('Deve trazer a mensagem ""productId" is required" se na venda não constar productId', async function () {

      const result = await salesService.createSales(salesMock.saleWithoutProductId);

      expect(result.type).to.be.equal('ANY_REQUIRED')
      expect(result.result.message).to.be.equal('"productId" is required');
    });
    it('Deve trazer a mensagem ""quantity" is required" se na venda não constar quantity', async function () {

      const result = await salesService.createSales(salesMock.saleWithoutQuantity);

      expect(result.type).to.be.equal('ANY_REQUIRED')
      expect(result.result.message).to.be.equal('"quantity" is required');
    });
    it('Deve trazer a mensagem ""quantity" must be greater than or equal to 1" se na venda constar quantity igual ou menor que zero', async function () {
  
      const result = await salesService.createSales(salesMock.saleZeroQuantity);

      expect(result.type).to.be.equal('NUMBER_MIN')
      expect(result.result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });
    it('Deve trazer a mensagem "Product not found" se na venda constar um productId inexistente no banco de dados', async function () {
      sinon.stub(productsService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', result: { message: 'Product not found' } });

      const result = await salesService.createSales(salesMock.nonexistentProductId);
      
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND')
      expect(result.result.message).to.be.equal('Product not found');
    });
  });
});