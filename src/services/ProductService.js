const BaseService = require("./BaseService");
const ProductModel = require('../models/Product')

class ProductService extends BaseService{
    constructor(){
        super(ProductModel)
    }

    findByIdAndManufacturer(id, manufacturerId){
        return super.BaseModel.findOne({'manufacturer': manufacturerId, '_id': id})
    }

    findByIdWithMedia(id){
        return super.BaseModel.findById(id).populate('media')
    }
}

module.exports = new ProductService()