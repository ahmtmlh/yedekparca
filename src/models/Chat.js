const Mongoose = require('mongoose')

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

module.exports = Mongoose.model('chat', ChatSchema)
