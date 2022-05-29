const BaseService = require("./BaseService");
const ManufacturerModel = require('../models/Manufacturer')

class ManufacturerService extends BaseService{
    constructor(){
        super(ManufacturerModel)
    }

    addProduct(manufacturer, product){

        if (!manufacturer.products)
            manufacturer.products = []
        
        product.manufacturer = manufacturer._id

        manufacturer.products.push(product._id)
        super.update(manufacturer._id, manufacturer)
    }

    getProducts(manufacturer){
        return super.findById(manufacturer._id).populate({
            path: 'products',
            populate: {
                path: 'manufacturer',
                select: '_id'
            }
        })
    }

    getOffers(manufacturer){
        return super.findById(manufacturer._id).populate({
                path: 'offer',
                populate: [
                    {
                        path: 'from_user_id',
                        select: 'username _id' 
                    },
                    {
                        path: 'to_manufacturer_id',
                        populate: {
                            path: 'user_id',
                            select: 'username _id'
                        }
                    },
                    {
                        path: 'products',
                        populate: {
                            path: 'manufacturer',
                            select: '_id'
                        }
                    }
                ]
            }
        )
    }

}

module.exports = new ManufacturerService()