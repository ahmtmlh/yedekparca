const hs = require('http-status')
const {passwordToHash, generateJWTAccessToken, generateJWTRefreshToken} = require('../scripts/jwtUtils')
const uuid = require('uuid')
const UserService = require('../services/UserService')

class UserController {

    signUp(req, res){
        req.body.password = passwordToHash(req.body.password)
        UserService.create(req.body)
            .then(createdUser => {
            
                if (!createdUser){
                    res.status(hs.INTERNAL_SERVER_ERROR).send({error: 'Unexpected error while creating user...'})
                    return
                }

                res.status(hs.OK).send(createdUser);

            }).catch(err => {

                if (err.code == 11000){
                    res.status(hs.BAD_REQUEST).send({error: "User already exists"})
                    return
                }

                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

    login(req, res){
        req.body.password = passwordToHash(req.body.password)
        UserService.findOne(req.body)
            .then(user => {
                
                if (!user){
                    res.status(hs.NOT_FOUND).send({error: 'User not found with given credentials'})
                    return
                }

                user = {
                    ...user.toObject(),
                    tokens: {
                        access_token: generateJWTAccessToken(user),
                        refresh_token: generateJWTRefreshToken(user)
                    }
                }

                delete user.password
                res.status(hs.OK).send(user)
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

    getChats(req, res){
        UserService.getChats(req.user)
            .then(user => {

                if (!user){
                    res.status(hs.NOT_FOUND).send({error: 'User not found'})
                    return
                }

                if (!user.chats){
                    res.status(hs.NOT_FOUND).send({error: 'User doesn\'t have any chats at the moment'});
                    return
                }

                console.log(user)

                res.status(hs.OK).send(user.chats)
            })
            .catch(err => {
                res.status(hs.INTERNAL_SERVER_ERROR).send(err)
            })
    }

}


module.exports = new UserController()
