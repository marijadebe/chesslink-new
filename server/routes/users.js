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

router.get('/', usersController.getUsers)
router.get('/:id/:username?',usersController.getUser)
router.post('/upload',imageUpload.single('image') ,usersController.postUpload)

module.exports = router