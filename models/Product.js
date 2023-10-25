const { shapeIntoMongooseObjectedId } = require("../lib/config");
const assert = require("assert");
const Definer = require("../lib/mistakes");
const ProductModel = require("../schema/product.model");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }
  async addNewProductData(data, member) {
    try {
      // member_id ni  monngoDB obj idga aylantirish;
      data.restaurant_mb_id = shapeIntoMongooseObjectedId(member._id);
      console.log(data);

      const new_product = new this.productModel(data);
      const result = await new_product.save();
      assert.ok(result, Definer.product_err1);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Product;
