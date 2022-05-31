const BaseService = require("./BaseService");
const ProductModel = require('../models/Product')

class ProductService extends BaseService{
    constructor(){
        super(ProductModel)
    }
}

module.exports = new ProductService()