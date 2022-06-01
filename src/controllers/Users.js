const hs = require('http-status')
const {passwordToHash, generateJWTAccessToken, generateJWTRefreshToken} = require('../scripts/jwtUtils')
const UserService = require('../services/UserService')
const ManufacturerService = require('../services/ManufacturerService')
const UserTypes = require('../constants/UserType')

class UserController {

    signUp(req, res){
        req.body.password = passwordToHash(req.body.password)
        UserService.create(req.body)
            .then(createdUser => {
            
                if (!createdUser){
                    res.status(hs.INTERNAL_SERVER_ERROR).send({error: 'Unexpected error while creating user...'})
                    return
                }

                createdUser.password = undefined

                if (createdUser.user_type == UserTypes.manufacturer){
                    // Add new manufacturer
                    const manufacturerData = {
                        user_id: createdUser._id
                    }

                    ManufacturerService.create(manufacturerData)
                        .then(manufacturer => {

                            createdUser = {
                                ...createdUser._doc,
                                manufacturer_id: manufacturer._id
                            }

                            res.status(hs.OK).send(createdUser);                            
                        })
                        .catch(err => {
                            console.log(err)
                            UserService.delete(createdUser._id)
                            res.status(hs.INTERNAL_SERVER_ERROR).send(err)
                            return
                        })

                } else if (createdUser.user_type == UserTypes.company){

                } else {
                    res.status(hs.OK).send(createdUser);
                }

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
