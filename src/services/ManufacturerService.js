const BaseService = require("./BaseService");
const ManufacturerModel = require('../models/Manufacturer')

class ManufacturerService extends BaseService{
    constructor(){
        super(ManufacturerModel)
    }

    addProduct(manufacturer, product){
        return super.updateQuery({'_id': manufacturer._id}, {$push: {products: product}})
    }

    getProducts(user){
        return super.findOne({'user_id': user._id}).populate({
            path: 'products'
        })
    }

    getOffers(user){
        return super.findOne({'user_id': user._id}).populate({
                path: 'offers',
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
    
    findByUser(user){
        return super.findOne({'user_id': user._id})
    }

}

module.exports = new ManufacturerService()