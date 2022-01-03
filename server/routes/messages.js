/**
 * @namespace Routes/Messages
 */
const express = require('express')
const router = express.Router()
const messagesController = require('../controllers/messagesController')

router.get('/:username', messagesController.getMessages)

module.exports = router