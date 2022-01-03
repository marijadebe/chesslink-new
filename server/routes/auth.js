/**
 * @namespace Routes/Auth
 */
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/reg', authController.postRegister)
router.post('/log', authController.postLogin)
router.get('/log', authController.getLogin)
router.get('/reg', authController.getVerify)
router.delete('/log', authController.deleteLogin)

module.exports = router