const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const products = require('./mocks/productsService.mock');

describe('Testes unitários da camada service referente às rotas dos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando acessada a rota GET "/products"', function () {
    it('Deve trazer todos os produtos por meio da função "getAll"', async function () {
      sinon.stub(productsModel, 'getAll').resolves(products);

      const result = await productsService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.result).to.be.deep.equal(products);
    });
  });

  describe('Quando acessada a rota GET "/products/:id" ', function () {
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

  describe('Quando acessada a rota POST "/products"', function () {
    it('Deve retornar um objeto com o id do produto cadastrado', async function () {
      const insertId = 3;

      const insertedProduct = {
        name: 'teste',
      };
      
      sinon.stub(productsModel, 'insert').resolves(insertId);

      const result = await productsService.createProduct(insertedProduct.name);

      expect(result.result).to.be.equal(insertId);
    });
    
    it('Deve retornar um objeto com o erro tipo ANY_REQUIRED e uma mensagem ""name" is required" caso o nome não exista', async function () {
      
      const result = await productsService.createProduct();
      
      expect(result.type).to.be.equal('ANY_REQUIRED')
      expect(result.result.message).to.be.equal('"name" is required');
    });
    it('Deve retornar um objeto com o erro tipo STRING_MIN e uma mensagem ""name" length must be at least 5 characters long" caso o nome tenha menos que 5 caracteres', async function () {

      const invalidName = 'test';

      const result = await productsService.createProduct(invalidName);

      expect(result.type).to.be.equal('STRING_MIN')
      expect(result.result.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });
  
  describe('Quando acessada a rota PUT "/products/:id"', function () {
    it('Deve retornar um objeto com número de linhas alteradas', async function () {
      const productName = 'teste';
      
      const productId = 1;

      sinon.stub(productsModel, 'findById').resolves(products[0]);
      sinon.stub(productsModel, 'updateProduct').resolves(1);

      const result = await productsService.updateProduct(productName, productId);

      expect(result.type).to.be.equal(null)
      expect(result.result).to.be.equal(1);
    });

    it('Deve retornar um objeto com o erro tipo ANY_REQUIRED e uma mensagem ""name" is required" caso o nome não exista', async function () {
      let productName;

      const productId = 1;

      const result = await productsService.updateProduct(productName, productId);

      expect(result.type).to.be.equal('ANY_REQUIRED')
      expect(result.result.message).to.be.equal('"name" is required');
    });

    it('Deve retornar um objeto com o erro tipo STRING_MIN e uma mensagem ""name" length must be at least 5 characters long" caso o nome tenha menos que 5 caracteres', async function () {
      const productName = 'tes';

      const productId = 1;

      const result = await productsService.updateProduct(productName, productId);

      expect(result.type).to.be.equal('STRING_MIN')
      expect(result.result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('Deve retornar um objeto com o erro tipo PRODUCT_NOT_FOUND e uma mensagem "Product not found" caso o produto não exista', async function () {
      const productName = 'teste';

      const productId = 99;
      
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.updateProduct(productName, productId);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND')
      expect(result.result.message).to.be.equal('Product not found');
    });
  });

  describe('Quando acessada a rota DELETE "/products/:id"', function () {
    it('Deve retornar um objeto com número de linhas afetadas', async function () {
      const productId = 1;

      sinon.stub(productsModel, 'findById').resolves(products[0]);
      sinon.stub(productsModel, 'deleteProduct').resolves(1);

      const result = await productsService.deleteProduct(productId);

      expect(result.type).to.be.equal(null)
      expect(result.result).to.be.equal(1);
    });
    
    it('Deve retornar um objeto com o erro tipo PRODUCT_NOT_FOUND e uma mensagem "Product not found" caso o produto não exista', async function () {
      const productId = 99;

      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.deleteProduct(productId);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND')
      expect(result.result.message).to.be.equal('Product not found');
    });
  });
});
