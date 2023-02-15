const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);

const salesMock = require('./mocks/salesController.mock');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');

describe('Testes unitários da camada controller referente à rota das vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando acessada a rota POST "/sales"', function () {
    
    it('Deve retornar o status 201 e um objeto com a venda cadastrada ao cadastrar uma venda válida', async function () {
      const res = {};
      const req = {
        body: salesMock.validSale,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves({ type: null, result: 1 });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 1, itemsSold: req.body });
    });
    
    it('Deve retornar o status 400 e uma mensagem "productId" is required" ao cadastrar uma venda sem produtoId', async function () {
      const res = {};
      const req = {
        body: salesMock.saleWithoutProductId,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves({ type: 'ANY_REQUIRED', result: { message: 'productId is required' } });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'productId is required' });
    });
    
    it('Deve retornar o status 400 e uma mensagem "quantity" is required" ao cadastrar uma venda sem quantity', async function () {
      const res = {};
      const req = {
        body: salesMock.saleWithoutQuantity,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves({ type: 'ANY_REQUIRED', result: { message: 'quantity is required' } });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'quantity is required' });
    });
    
    it('Deve retornar o status 422 e uma mensagem ""quantity" must be greater than or equal to 1" ao cadastrar uma venda com a quantidade igual ou menor que zero', async function () {
      const res = {};
      const req = {
        body: salesMock.saleWithoutQuantity,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves({
        type: 'NUMBER_MIN', result: {
          message: '"quantity" must be greater than or equal to 1'
        } });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
    
    it('Deve retornar o status 404 e uma mensagem "Product not found" ao cadastrar uma venda com o productId inexistente no banco de dados', async function () {
      const res = {};
      const req = {
        body: salesMock.saleWithoutQuantity,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves({
        type: 'PRODUCT_NOT_FOUND', result: {
          message: 'Product not found'
        }
      });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

  });

  describe('Quando acessada a rota GET "/sales"', function () {

    it('Deve retornar o status 200 e uma lista de todas as vendas se houver vendas cadastradas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAllSales').resolves({ type: null, result: salesMock.allSales });

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesMock.allSales);
    });
  });

  describe('Quando acessada a rota GET "/sales/:id"', function () {

    it('Deve retornar o status 200 e uma lista das vendas corresponde ao id passado por parâmetro', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSaleById').resolves({ type: null, result: salesMock.saleById });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesMock.saleById);
    });

    it('Deve retornar o status 404 e uma mensagem "product not found" se a venda referente ao id passado por parâmetro não existir', async function () {
      const res = {};
      const req = {
        params: { id: 99 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSaleById').resolves({ type: 'SALE_NOT_FOUND', result: { message: 'Sale not found' } });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});