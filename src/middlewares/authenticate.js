const JWT = require('jsonwebtoken');
const httpStatus = require('http-status');
const UserTypes = require('../constants/UserType')

const authenticateToken = (req, res, next) => {
    const token = req.headers?.token;
    if (!token) 
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Please login to continue' })

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) 
            return res.status(httpStatus.FORBIDDEN).send(err)
        
        req.user = user
        next()
    })
}

const authenticateTokenWithUserType = (userType) => (req, res, next) => {
   
    if (!Object.values(UserTypes).includes(userType))
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: 'Unknown user type has given'})

    const token = req.headers?.token;
    if (!token) 
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Please login to continue' })

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) 
            return res.status(httpStatus.FORBIDDEN).send(err)
           
        if (user.user_type !== userType)
            return res.status(httpStatus.FORBIDDEN).send({error: 'Required access level is not met'})

        req.user = user
        next()
    })
}


module.exports = {authenticateToken, authenticateTokenWithUserType}