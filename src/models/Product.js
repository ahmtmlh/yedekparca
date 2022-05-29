const Mongoose = require('mongoose')

const ProductSchema = new Mongoose.Schema(
    {
        name: String,
        description: String,
        estimated_price_range: String,
        estimated_manufacturing_time: String,
        photos: [String],
        categories: [String],
        manufacturer: {
            type: Mongoose.Types.ObjectId,
            ref: 'manufacturer'
        }
    },
    {timestamps: true, versionKey: false}
)

module.exports = Mongoose.model('product', ProductSchema)
