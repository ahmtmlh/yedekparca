const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const manufacturerSchema = Joi.object(
    {
        shop_name: Joi.string().min(5).max(64).required(),
        description: Joi.string().max(3000).required(),
        categories: Joi.array().items(Joi.string()).min(1), // Add valid categories
        rating: Joi.forbidden(),
        rate_count: Joi.forbidden()
    }
)

const manufacturerCategoriesSchema = Joi.object(
    {
        categories: Joi.array().items(Joi.string())
    }
)

class ManufacturerValidations{
    constructor(){
        this.manufacturerSchema = manufacturerSchema
        this.manufacturerCategoriesSchema = manufacturerCategoriesSchema
    }
}

module.exports = new ManufacturerValidations()