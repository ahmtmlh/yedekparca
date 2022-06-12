const BaseService = require("./BaseService");
const ProductModel = require('../models/Product')

class ProductService extends BaseService{
    constructor(){
        super(ProductModel)
    }

    findByIdAndManufacturer(id, manufacturerId){
        return super.findOne({'manufacturer': manufacturerId, '_id': id})
    }

    findByIdWithMedia(id){
        return super.findById(id).populate('media')
    }

    findByNameAndManufacturer(name, manufacturerId){
        return super.findOne({'name': name, 'manufacturer': manufacturerId})
    }
}

module.exports = new ProductService()