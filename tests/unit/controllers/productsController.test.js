const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);

const products = require('./mocks/productsController.mock');
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');


describe('Testes unitários da camada controller referente às rotas dos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando acessada a rota GET "/products"', function () {
    it('Deve retornar o status 200 e uma lista dos produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'getAll').resolves({ type: null, result: products });

      await productsController.listAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Quando acessada a rota GET "/products/:id"', function () {
    it('Deve retornar o status 200 e o produto com o id correspondente se o produto existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves({ type: null, result: products[1] });

      await productsController.listProductById(req, res);

      expect(res.status).to.have.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[1]);
    });
    
    it('Deve retornar o status 404 e a mensagem "Product not found" se o produto inexistir', async function () {
      const res = {};
      const req = {
        params: { id: 5 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', result: { message: 'Product not found' } });

      await productsController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Quando acessada a rota POST "/products"', async function () {
    it('Deve retornar o status 200 e um objeto com o nome e id do produto cadastrado se o produto for válido', async function () {
      const res = {};
      const req = {
        body: {
          name: 'teste',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'createProduct')
        .resolves({ type: null, result: 4 });
    
      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ name: 'teste', id: 4 })
    });
    it('Deve retornar o status 400 e a mensagem ""name" is required" no caso de não existir o campo "name" ', async function () {
      const res = {};
      const req = {
        body: {
          name: '',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'createProduct')
        .resolves({ type: 'ANY_REQUIRED', result: { message: '"name" is required' } });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' })
    });
    it('Deve retornar o status 422 e a mensagem ""name" length must be at least 5 characters long" no caso de o campo name ter menos de 5 caracteres', async function () {
      const res = {};
      const req = {
        body: {
          name: 'oo',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'createProduct')
        .resolves({ type: 'STRING_MIN', result: { message: '"name" length must be at least {#limit} characters long' } });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least {#limit} characters long' })
    });
  });
});
