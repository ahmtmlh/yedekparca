const hs = require('http-status')
const ProductService = require('../services/ProductService')


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

}

module.exports = new ProductController()