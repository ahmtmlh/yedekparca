const Mongoose = require('mongoose')
const UserModel = require('./User')

const ChatSchema = new Mongoose.Schema(
    {
        from_user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user'
        },
        to_user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user'
        },
        messages: [
            {
                message_type: String,
                message: String,
                attachments: [String],
                sender_id: {
                    type: Mongoose.Types.ObjectId,
                    ref: 'user'
                },
                created_at: Date,
                seen_by_receiver: Boolean
            }
        ],
        created_at: Date
    },
    {timestamps: true, versionKey: false}
)

ChatSchema.post('findOneAndDelete', { query: true, document: false }, (doc) => {
    const id = doc._id
    UserModel.updateMany({}, { $pullAll: { chats: [{_id: id}] } } ).exec()
})

module.exports = Mongoose.model('chat', ChatSchema)
