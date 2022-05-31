const Joi = require('joi')
const UserTypes = require('../constants/UserType')

Joi.objectId = require('joi-objectid')(Joi)

const addressSchama = Joi.object().keys(
    {
        title: Joi.string().required().max(50),
        address_line1: Joi.string().required(),
        address_line2: Joi.string().required(),
        lat: Joi.number(),
        lon: Joi.number(),
        country: Joi.string().required(),
        province: Joi.string().required(),
        code: Joi.string().required()
    }
)

const phoneSchema = Joi.object().keys(
    {
        title: Joi.string().required(),
        number: Joi.string().required(),
        can_receive_messages: Joi.bool(),
        is_public: Joi.bool()
    }
)

const registerUser = Joi.object(
    {
        first_name: Joi.string().required().min(2),
        last_name: Joi.string().required().min(2),
        user_type: Joi.string().valid(...Object.values(UserTypes)).required(),
        email: Joi.string().required().email(),
        username: Joi.string().required().min(4).max(30),
        password: Joi.string().required().min(5).max(30),
        addresses: Joi.array().items(addressSchama),
        phones: Joi.array().items(phoneSchema),
        chats: Joi.forbidden()
    }
)

const loginUser = Joi.object(
    {
        username: Joi.string().min(4).max(30),
        email: Joi.string().email(),
        password: Joi.string().required()
    }
).xor('username', 'email')

class UserValidations{

    constructor(){
        this.loginUser = loginUser
        this.registerUser = registerUser
    }
}

module.exports = new UserValidations()