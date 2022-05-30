const express = require('express')
const MessageController = require('../controllers/Message')
const {authenticateToken, authenticateTokenWithUserType} = require("../middlewares/authenticate")
const ChatValidations = require('../validations/Chat')
const validate = require('../middlewares/validate')

const router = express.Router();

router.route('/sendmessage').post(authenticateToken, validate(ChatValidations.sendMessage), MessageController.sendMessage)
router.route('/delete').delete(authenticateToken, validate(ChatValidations.removeChat), MessageController.removeChat)

module.exports = router