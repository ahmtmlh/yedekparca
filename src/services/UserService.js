const BaseService = require("./BaseService");
const UserModel = require('../models/User')

class UserService extends BaseService {
    constructor(){
        super(UserModel)
    }

    getChats(user){
        return super.findById(user._id).populate({
            path: 'chats',
            populate: [
                {
                   path: 'participants',
                   select: 'username _id' 
                },
                {
                    path: 'messages',
                    populate: {
                        path: 'sender_id',
                        select: '_id'
                    }
                }
            ]
        })
    }

}

module.exports = new UserService()