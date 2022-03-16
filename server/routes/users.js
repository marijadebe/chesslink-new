/**
 * @namespace Routes/Users
 */
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img');
      },
    filename: (req, file, cb) => {
        cb(
          null,
          file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
      },
})
const imageUpload = multer({storage:storage})

router.get('/yourself', usersController.getYourself)
router.get('/leaderboard', usersController.getLeaderboard)
router.get('/:id/:username?',usersController.getUser)
router.post('/upload',imageUpload.single('image') ,usersController.postUpload)
router.put('/preferences', usersController.putPreferences)
router.get('/', usersController.getUsers)

module.exports = router