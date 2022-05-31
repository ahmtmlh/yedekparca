const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const sendMessage = Joi.object(
    {
        to_user_id: Joi.objectId().required(),
        message: Joi.object({
            message_type: Joi.string().required().max(2),
            text: Joi.string().max(1000).required(),
            attachments: Joi.array().items(Joi.string()),
            sender_id: Joi.forbidden()
        }).required(),
        created_at: Joi.forbidden()
    }
)

const removeChat = Joi.object({_id: Joi.objectId().required()})


class ChatValidations{
    constructor(){
        this.sendMessage = sendMessage
        this.removeChat = removeChat
    }
}

module.exports = new ChatValidations()