const hs = require('http-status')
const { manufacturer } = require('../constants/UserType')
const ManufacturerService = require('../services/ManufacturerService')
const ProductService = require('../services/ProductService')


class ManufacturerController {
    
    getProducts(req, res){  
        ManufacturerService.getProducts(req.user)
            .then(manufacturer => {
                
                if (!manufacturer){
                    res.status(hs.NOT_FOUND).send({error: 'Manufacturer not found'})
                    return
                }

                if (manufacturer.products.lenght == 0){
                    res.status(hs.NOT_FOUND).send({error: 'No products found'})
                    return
                }

                res.status(hs.OK).send(manufacturer.products)
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

    addProduct(req, res){
        ManufacturerService.findOne({'user_id': req.user._id})
            .then(manufacturer => {
                if (!manufacturer){
                    res.status(hs.NOT_FOUND).send({error: 'Manufacturer not found'})
                    return
                }
                
                // Manufacturer is found, create a new product
                const product = {
                    ...req.body,
                    'manufacturer': manufacturer._id,
                }

                ProductService.create(product)
                    .then(createdProduct => {
                        if (!createdProduct){
                            res.status(hs.INTERNAL_SERVER_ERROR).send({error: 'Error while creating product'})
                            return
                        }

                        res.status(hs.OK).send()
                    })
                    .catch(err => {
                        res.status(hs.INTERNAL_SERVER_ERROR).send(err)
                    })
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

    addMediaToProduct(req, res){
        
    }

    getOffers(req, res){
        ManufacturerService.getOffers(req.user)
            .then(manufacturerWithOffers => {
                
                if (!manufacturerWithOffers){
                    res.status(hs.NOT_FOUND).send({message: 'Manufacturer not found'})
                    return
                }

                if (manufacturerWithOffers.offers.lenght == 0){
                    res.status(hs.NOT_FOUND).send({message: 'No offer has been found'})
                    return
                }

                res.status(hs.OK).send(manufacturerWithOffers.offers)

            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

}


module.exports = new ManufacturerController()
