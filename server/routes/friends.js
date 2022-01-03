/**
 * @namespace Routes/Friends
 */
const express = require('express')
const router = express.Router()
const friendsController = require('../controllers/friendsController')

router.get('/', friendsController.getFriends)
router.get('/:id/:offerer?/:offeree?', friendsController.getFriend)

module.exports = router