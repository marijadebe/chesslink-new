const express = require('express')
const router = express.Router()
const boardsController = require('../controllers/boardsController')

router.get('/:id',boardsController.getBoard)

module.exports = router