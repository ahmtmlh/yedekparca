const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const estimatedPriceRangeSchema = Joi.object().keys(
    {
        price_min: Joi.number().min(0).required(),
        price_max: Joi.number().min(Joi.ref('price_min')).required()
    }
)

const estimatedManufacturingTime = Joi.object().keys(
    {
        min_seconds: Joi.number().min(0).required(),
        max_seconds: Joi.number().min(Joi.ref('min_seconds')).required()
    }
)

const productSchema = Joi.object(
    {
        name: Joi.string().min(3).max(64).required(),
        description: Joi.string().min(16).max(1024).required(),
        estimated_price_range: estimatedPriceRangeSchema,
        estimated_price_range_visible: Joi.boolean(),
        estimated_manufacturing_time: estimatedManufacturingTime,
        estimated_manufacturing_time_visible: Joi.boolean(),
        categories: Joi.array().items(Joi.string()), // Add valid categories
        media: Joi.forbidden(),
        manufacturer: Joi.forbidden()
    }
)

class ProductValidations{
    constructor(){
        this.addProductSchema = productSchema
        this.updateProductSchema = productSchema
    }
}

module.exports = new ProductValidations()