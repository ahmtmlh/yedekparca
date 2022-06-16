const Mongoose = require('mongoose')

const OfferSchema = new Mongoose.Schema(
    {
        name: String,
        description: String,
        company: {
            type: Mongoose.Types.ObjectId,
            ref: 'company'
        },
        manufacturer: {
            type: Mongoose.Types.ObjectId,
            ref: 'manufacturer'
        },
        type: String,
        attachments: [String],
        product: {
            type: Mongoose.Types.ObjectId,
            ref: 'product'
        },
        chat:{
            type: Mongoose.Types.ObjectId,
            ref: 'chat'
        },
        is_viewed: Boolean,
        price: Number
    },
    { timestamps: true, versionKey: false }
)

module.exports = Mongoose.model('offer', OfferSchema)