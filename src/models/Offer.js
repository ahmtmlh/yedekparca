const Mongoose = require('mongoose')

const OfferSchema = new Mongoose.Schema(
    {
        offer_name: String,
        offer_description: String,
        from_user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user'
        },
        to_manufacturer_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'manufacturer'
        },
        offer_type: String,
        attachments: [String],
        product_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'product'
        },
        created_at: Date,
        is_viewed: Boolean,
    },
    { timestamps: true, versionKey: false }
)

module.exports = Mongoose.model('offer', OfferSchema)