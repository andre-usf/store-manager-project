const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const products = require('./mocks/productsModel.mock');

describe('Testes unitários da camada model referente às rotas dos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  describe('Quando acessada a rota GET "/products"', function () {
    it('Deve trazer todos os produtos por meio da função "getAll"', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productsModel.getAll();

      expect(result).to.be.deep.equal(products);
    });
  });

  describe('Quando acessada a rota GET "/products/:id"', function () {
    it('Deve trazer o produto do id correspondente por meio da função "findById"', async function () {
      sinon.stub(connection, 'execute').resolves([[products[1]]]);

      const result = await productsModel.findById(2);

      expect(result).to.be.deep.equal(products[1]);
    });
  });

  describe('Quando acessada a rota POST "/products"', function () {
    it('Deve inserir o produto e retornar um objeto com seu nome e id', async function () {
      const insertId = 3;

      const insertedProduct = {
        name: 'teste',
      };
      
      sinon.stub(connection, 'execute').resolves([{ insertId }]);

      const result = await productsModel.insert(insertedProduct.name);

      expect(result).to.be.equal(insertId);
    });
  });
});
