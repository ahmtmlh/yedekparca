const Mongoose = require('mongoose')
const ManufacturerModel = require('./Manufacturer')

const ProductSchema = new Mongoose.Schema(
    {
        name: String,
        description: String,
        estimated_price_range: String,
        estimated_price_range_visible: Boolean,
        estimated_manufacturing_time: String,
        estimated_manufacturing_time_visible: Boolean,
        media: [String],
        categories: [String],
        manufacturer: {
            type: Mongoose.Types.ObjectId,
            ref: 'manufacturer',
            required: true
        }
    },
    {timestamps: true, versionKey: false}
)

ProductSchema.post('findOneAndDelete', { query: true, document: false }, (doc) => {
    const id = doc._id
    ManufacturerModel.updateMany({}, { $pullAll: { products: [{_id: id}] } } ).exec()
})

module.exports = Mongoose.model('product', ProductSchema)
