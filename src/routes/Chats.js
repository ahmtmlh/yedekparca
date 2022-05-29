const express = require('express')
const MessageController = require('../controllers/Message')

const router = express.Router();

router.route('/sendmessage').post(MessageController.sendMessage)
router.route('/delete').delete(MessageController.removeChat)

module.exports = router