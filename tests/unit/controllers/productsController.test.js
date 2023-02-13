const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const products = require('./mocks/productsController.mock');

chai.use(sinonChai);

describe('Testes unitários da camada controller referente às rotas dos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando acessada a rota "/products"', function () {
    it('Deve retornar o status 200 e uma lista dos produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'getAll').resolves(products);

      await productsController.listAllProducts(req, res);

      expect(res.status).to.have.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Quando acessada a rota "/products/:id"', function () {
    it('Deve retornar o status 200 e o produto com o id correspondente se o produto existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves(products[1]);

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
      req.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves({ message: "Product not found" });

      await productsController.listProductById(req, res);

      expect(res.status).to.have.calledWith(404);
      expect(res.json).to.have.been.calledWith("Product not found");
    });
  });
});
