const Mongoose = require('mongoose')

const ManufacturerSchema = new Mongoose.Schema(
    {
        shop_name: String,
        description: String,
        categories: [String],
        user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user'
        },
        products: [
            {
                type: Mongoose.Types.ObjectId,
                ref: 'product'
            }
        ],
        offers: [
            {
                type: Mongoose.Types.ObjectId,
                ref: 'offer'
            }
        ],
        rating: Number,
        rate_count: Number,
    },
    {timestamps: true, versionKey: false}
)

module.exports = Mongoose.model('manufacturer', ManufacturerSchema)