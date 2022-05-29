const hs = require('http-status')
const ManufacturerService = require('../services/ManufacturerService')

class ManufacturerController {
    
    getProducts(req, res){  
        
    }

    addProduct(req, res){

    }

    getOffers(req, res){
        const manufacturer = req.body
        ManufacturerService.getOffers(manufacturer)
            .then(manufacturerWithOffers => {
                
                if (!manufacturerWithOffers){
                    res.status(hs.NOT_FOUND).send({message: 'Manufacturer not found'})
                    return
                }

                if (!manufacturerWithOffers.offers || manufacturerWithOffers.offers.lenght == 0){
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
