const express = require('express')
const Users = require("../controllers/Users")
const {authenticateToken, authenticateTokenWithUserType} = require("../middlewares/authenticate")
const UserValidations = require('../validations/Users')
const validate = require('../middlewares/validate')

const router = express.Router();

router.route('/test').post((req, res) => {
    
    console.log(req.body)
    res.status(200).send('Hello world!')
})

router.route('/login').post(validate(UserValidations.loginUser), Users.login)
router.route('/register').post(validate(UserValidations.registerUser), Users.signUp)
router.route('/chats').get(authenticateToken, validate(UserValidations.getUserChats), Users.getChats)

module.exports = router