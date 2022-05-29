const BaseService = require("./BaseService");
const UserModel = require('../models/User')

class UserService extends BaseService {
    constructor(){
        super(UserModel)
    }

    getChats(where){
        return super.findOne(where).populate({
            path: 'chat',
            populate: [
                {
                   path: 'from_user_id',
                   select: 'username' 
                },
                {
                    path: 'to_user_id',
                    select: 'username' 
                },
                {
                    path: 'messages',
                    populate: {
                        path: 'sender_id',
                        select: 'username'
                    }
                }
            ]
        })
    }

}

module.exports = new UserService()