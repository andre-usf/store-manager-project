const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const products = require('./mocks/productsModel.mock');

describe('Testes unitários da camada model referente aos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  describe('Quando chamada a função "getAll"', function () {
    it('Deve trazer todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productsModel.getAll();

      expect(result).to.be.deep.equal(products);
    });
  });

  describe('Quando chamada a função "findById"', function () {
    it('Deve trazer o produto do id correspondente', async function () {
      sinon.stub(connection, 'execute').resolves([[products[1]]]);

      const result = await productsModel.findById(2);

      expect(result).to.be.deep.equal(products[1]);
    });
  });

  describe('Quando chamada a função "insert"', function () {
    it('Deve inserir o produto e retornar um objeto com o id do produto cadastrado', async function () {
      const insertId = 3;

      const insertedProduct = {
        name: 'teste',
      };
      
      sinon.stub(connection, 'execute').resolves([{ insertId }]);

      const result = await productsModel.insert(insertedProduct.name);

      expect(result).to.be.equal(insertId);
    });
  });

  describe('Quando chamada a função "updateProduct"', function () {
    it('Deve alterar o produto referente ao id passado por parâmetro caso o nome seja válido e o produto exista', async function () {
      const changedRows = 1;
      
      const productName = "Teste";

      const productId = 1;

      sinon.stub(connection, 'execute').resolves([{ changedRows }]);

      const result = await productsModel.updateProduct(productName, productId);

      expect(result).to.be.equal(changedRows);
    });
  });

  describe('Quando chamada a função "deleteProduct"', function () {
    it('Deve deletar o produto referente ao id passado por parâmetro caso o produto exista', async function () {
      const affectedRows = 1;

      const productId = 1;

      sinon.stub(connection, 'execute').resolves([{ affectedRows }]);

      const result = await productsModel.deleteProduct(productId);

      expect(result).to.be.equal(affectedRows);
    });
  });

  describe('Quando chamada a função "searchProductByQuery"', function () {
    it('Deve retornar um array com os produtos que foram encontrados pela busca', async function () {
      const query = 'Martelo';
      
      sinon.stub(connection, 'query').resolves([[products[0]]]);

      const result = await productsModel.searchProductByQuery(query);

      expect(result).to.be.deep.equal([products[0]]);
    });
  });
});
