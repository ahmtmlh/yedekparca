const hs = require('http-status')
const ManufacturerService = require('../services/ManufacturerService')
const ProductService = require('../services/ProductService')

async function searchFunction(req, res, categories=undefined){
    let where = {}
    if (categories){
        where = {'categories': {'$in': categories}}
    }

    const start = req.params.start
    const count = req.params.count
    let documentCount = 0

    if (start == 0){
        documentCount = await ManufacturerService.count()

        if (documentCount == 0){
            res.status(hs.NOT_FOUND).send({message: 'No manufacturer found'})
            return
        }
    }

    ManufacturerService.list(where).skip(start).limit(count)
        .then(manufacturerList => {
            if (!manufacturerList){
                res.status(hs.NOT_FOUND).send({message: 'No manufacturer found'})
                return
            }

            const ret = {
                totalCount: documentCount,
                manufacturerList: manufacturerList
            }
            
            res.status(hs.OK).send(ret)
        })
        .catch(err => {
            console.log(err)
            res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
        })
}

class ManufacturerController {
    
    updateManufacturer(req, res){
        ManufacturerService.findByUser(req.user)
            .then(manufacturer => {
                if (!manufacturer){
                    res.status(hs.NOT_FOUND).send({message: 'Manufacturer with id is not found'})
                    return
                }

                ManufacturerService.update(manufacturer._id, req.body)
                    .then(updatedManufacturer => {

                        if (!updatedManufacturer){
                            res.status(hs.INTERNAL_SERVER_ERROR).send({error: 'Unknown error while updating manufacturer information'})
                            return
                        }

                        res.status(hs.OK).send(updatedManufacturer)
                    })
                    .catch(err => {
                        res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
                    })
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
            })
    }

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
        ManufacturerService.findByUser(req.user)
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

                ProductService.findByNameAndManufacturer(product.name, manufacturer._id)
                    .then(foundProduct => {
                        
                        if (foundProduct){
                            res.status(hs.BAD_REQUEST).send({message: 'Product with given name exists'})
                            return
                        }

                        ProductService.create(product)
                            .then(createdProduct => {
                                
                                if (!createdProduct){
                                    res.status(hs.INTERNAL_SERVER_ERROR).send({error: 'Error while creating product'})
                                    return
                                }

                                ManufacturerService.addProduct(manufacturer, createdProduct)
                                    .then(updatedManufacturer => {
                                        
                                        if (!updatedManufacturer){
                                            res.status(hs.NOT_FOUND).send({error: 'Adding to manufacturer failed'})
                                            ProductService.delete(createdProduct._id)
                                            return
                                        }
                                        
                                        res.status(hs.OK).send(createdProduct)
                                    })
                                    .catch(err => {
                                        res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
                                    })
                            })
                            .catch(err => {
                                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
                            })

                    })
                    .catch(err => {
                        console.log(err)
                        res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
                    })
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
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

    async search(req, res){
        let categories = req.params.categories

        if (!categories){
            await searchFunction(req, res)
        } else {
            categories = categories.split(',')
            await searchFunction(req, res, categories)
        }
    }
}


module.exports = new ManufacturerController()
