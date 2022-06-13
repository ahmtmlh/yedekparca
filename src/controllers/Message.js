const hs = require('http-status')
const User = require('../models/User')
const UserService = require('../services/UserService')
const ChatService = require('../services/ChatService')

async function updateUsers(chat, fromUser, toUser){
    toUser.chats.push(chat._id)
    fromUser.chats.push(chat._id)

    await Promise.all([UserService.update(toUser._id, toUser), UserService.update(fromUser._id, fromUser)])
}

function createMessage(res, chat, fromUser, toUser){
    ChatService.create(chat)
        .then(createdChat => {
            updateUsers(createdChat, fromUser, toUser).then(() => res.status(hs.OK).send(createdChat.messages))
        })
        .catch(err => {
            console.log(err)
            res.status(hs.INTERNAL_SERVER_ERROR).send(err)
        })
}

function updateMessage(res, chat){
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

class MessageController {
    constructor(){
        
    }

    async sendMessage(req, res){

        const message = req.body.message
        const toUserId = req.body.to_user_id
        const fromUser = req.user

        if (fromUser._id.toString() == toUserId){
            res.status(hs.BAD_REQUEST).send({message: 'Sender ID and receiver ID can\'t should be different'})
            return
        }

        const toUser = await UserService.findById(toUserId).catch(err => {res.status(hs.INTERNAL_SERVER_ERROR).send(err)})
        if (!toUser){
            res.status(hs.NOT_FOUND).send({message: 'Receiver user not found'})
            return
        }

        ChatService.findChat(fromUser._id, toUser._id)
            .then(chat => {

                let messageModel = {
                    message_type: message.message_type,
                    message: message.text,
                    attachments: message.attachments,
                    sender_id: fromUser._id,
                    created_at: new Date().toISOString(),
                    seen_by_receiver: false
                }

                if (!chat){
                    createMessage(res, {
                        participants: [fromUser._id, toUser._id],
                        messages: [messageModel]
                    }, fromUser, toUser)

                } else {

                    if (!chat.messages)
                        chat.messages = []

                    chat.messages.push(messageModel)

                    updateMessage(res, chat)
                }

            })
            .catch(err => {
                console.log(err)
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

    removeChat(req, res){
        ChatService.findOne(
            {
                _id: req.params.chat_id, 
                participants: req.user._id
            })
            .then(chat=> {

                if (!chat){
                    res.status(hs.NOT_FOUND).send({message: 'Chat by id is not found'})
                    return
                }

                ChatService.delete(chat._id)
                    .then(deletedChat => {
                        console.log(deletedChat)
                        res.status(hs.OK).send({message: 'Delete success'})
                    })
                    .catch(deleteError => {
                        console.log(deleteError)
                        res.status(hs.INTERNAL_SERVER_ERROR).send(deleteError)
                    })

            })
            .catch(err=> {
                //console.log(err)
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

    checkMessageForUser(res, req, next){

    }
}

module.exports = new MessageController()