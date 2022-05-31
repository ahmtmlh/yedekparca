const BaseService = require("./BaseService");
const ChatModel = require('../models/Chat')

class ChatService extends BaseService{
    constructor(){
        super(ChatModel)
    }

    findMessage(fromUserId, toUserId){
        return super.findOne({from_user_id: fromUserId, to_user_id: toUserId})
    }

    setMessageRead(messageId, userId){
        return super.updateQuery(
            {
                'messages._id': messageId, 
                'messages.sender_id': userId
            }, 
            {
                '$set': {
                    'messages.$.seen_by_receiver': true
                }
            }
        )
    }
}

module.exports = new ChatService()