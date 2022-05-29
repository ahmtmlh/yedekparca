const hs = require('http-status')
const User = require('../models/User')
const UserService = require('../services/UserService')
const ChatService = require('../services/ChatService')

class MessageController{
    constructor(){

    }

    saveMessage(res, chat){
        ChatService.update(chat._id, chat)
            .then(response => {
                if (!response){
                    res.status(hs.INTERNAL_SERVER_ERROR).send({error: 'Chat message save failed'})
                    return
                }

                res.status(hs.OK).send(chat.messages)

            })
            .catch(chatError => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(chatError)
            })
    }

    async sendMessage(req, res){

        const message = req.body.message
        const fromUserId = req.body.from_user_id
        const toUserId = req.body.to_user_id

        const fromUser = await UserService.findById(fromUserId).catch(err => res.status(hs.INTERNAL_SERVER_ERROR).send(err))
        const toUser = await UserService.findById(toUserId).catch(err => res.status(hs.INTERNAL_SERVER_ERROR).send(err))

        if (!fromUser){
            res.status(hs.NOT_FOUND).send({message: 'Sender user not found'})
            return
        }

        if (!toUser){
            res.status(hs.NOT_FOUND).send({message: 'Receiver user not found'})
            return
        }

        ChatService.findMessage(fromUser._id, toUser._id)
            .then(chat => {

                let messageModel = {
                    message_type: message.message_type,
                    message: message.text,
                    attachments: message.attachments,
                    sender_id: fromUser._id,
                    created_at: new Date().toISOString(),
                    seen_by_receiver: false
                }

                if (!chat.messages)
                    chat.messages = []

                chat.messages.push(messageModel)
                this.saveMessage(res, chat)
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

}

module.exports = new MessageController()