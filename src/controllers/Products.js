const hs = require('http-status')
const ProductService = require('../services/ProductService')
const ManufacturerService = require('../services/ManufacturerService')

class ProductController{

    constructor(){

    }

    getProductDetails(req, res){
        ProductService.findById(req.params.id)
            .then(product => {
                if (!product){
                    res.status(hs.NOT_FOUND).send()
                    return
                }

                res.status(hs.OK).send(product)
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
                return
            })
    }

    deleteProduct(req, res){
        ManufacturerService.findByUser(req.user)
            .then(manufacturer => {
                
                if (!manufacturer) {
                    res.status(hs.NOT_FOUND).send({message: 'Manufacturer not found'})
                    return
                }
                
                ProductService.findByIdAndManufacturer(req.params.id, manufacturer._id)
                    .then(foundProduct => {
                        if (!foundProduct){
                            res.status(hs.BAD_REQUEST).send({message: 'Product was not found in for this maufacturer'})
                            return
                        }

                        ProductService.delete(foundProduct._id)
                            .then(deletedProduct => {
                                if (!deletedProduct){
                                    res.status(hs.NOT_FOUND).send({message: 'Product with given id is not found'})
                                    return
                                }
                
                                res.status(hs.OK).send({message: 'Delete product is successful'})
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
            })
    }

    updateProduct(req, res){
        ManufacturerService.findByUser(req.user)
            .then(manufacturer => {

                if (!manufacturer){
                    res.status(hs.NOT_FOUND).send({message: 'Manufacturer not found'})
                    return
                }

                ProductService.findByIdAndManufacturer(req.params.id, manufacturer._id)
                    .then(foundProduct => {
                        if (!foundProduct){
                            res.status(hs.BAD_REQUEST).send({message: 'Product was not found in for this maufacturer'})
                            return
                        }

                        ProductService.update(foundProduct._id, req.body)
                            .then(updatedProduct => {
                                if (!updatedProduct){
                                    res.status(hs.NOT_FOUND).send({message: 'Product with given id is not found'})
                                    return
                                }
                
                                res.status(hs.OK).send({message: 'Update product is successful'})
                            })
                            .catch(err => {
                                res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
                            })
                    })
                    .catch(err => {
                        res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
                    })

            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send({error: err})
            })
    }

    addMedia(req, res){
        
    }

}

module.exports = new ProductController()