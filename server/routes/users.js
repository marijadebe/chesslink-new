const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.getUsers)
router.get('/:id/:username?',usersController.getUser)

module.exports = router