const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  find(limit, offset) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = [];

        if(limit && offset) {
          for (let i = parseInt(offset); i < parseInt(limit) + parseInt(offset); i++) {
            result.push(this.products[i]);
          }
        } else {
          const max = this.products.length;
          const limit = max - 10;
          for (let i = limit; i < max; i++) {
            result.push(this.products[i]);
          }
        }
        resolve(result);
      }, 1000);
    });
  }

  async findOne(id) {
    const index = this.products.findIndex((product) => product.id === parseInt(id));
    if(index === -1) {
      throw boom.notFound('product not found');
    }

    if(this.products[index].isBlock) {
      throw boom.conflict('product is blocked');
    }

    return this.products[index];
  }

  async create(body) {
    const id = this.products.length + 1;
    const newProduct = {
      id: id,
      ...body,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === parseInt(id));
    if(index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === parseInt(id));
    if(index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }



}

module.exports = ProductsService;
