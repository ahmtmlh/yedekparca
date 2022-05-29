const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        user_type: String,
        email: {type: String, unique: true},
        username: {type: String, unique: true},
        password: String,
        addresses: [
            {
                title: String,
                address_line1: String,
                address_line2: String,
                lat: Number,
                lon: Number,
                country: String,
                province: String,
                code: String
            }
        ],
        phones: [
            {
                title: String,
                number: String,
                can_receive_messages: Boolean,
                is_public: Boolean
            }
        ],
        chats: [
            {
                type: Mongoose.Types.ObjectId,
                ref: 'chat'
            },
            {required: false}
        ]
    },
    {timestamps: true, versionKey: false}
)

module.exports = Mongoose.model('user', UserSchema)
