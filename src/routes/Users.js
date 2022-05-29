const express = require('express')
const Users = require("../controllers/Users")

const {authenticateToken, authenticateTokenWithUserType} = require("../middlewares/authenticate")

const router = express.Router();

router.route('/test').post((req, res) => {
    
    console.log(req.body)
    res.status(200).send('Hello world!')
})

router.route('/login').post(Users.login)
router.route('/register').post(Users.signUp)
router.route('/chats').get(Users.getChats)

module.exports = router