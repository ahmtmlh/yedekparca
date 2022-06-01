const BaseService = require("./BaseService");
const ChatModel = require('../models/Chat')

class ChatService extends BaseService{
    constructor(){
        super(ChatModel)
    }

    findChat(...userIds){
        return super.findOne({
            participants: {
                $all: userIds
            }
        })
    }
}

module.exports = new ChatService()