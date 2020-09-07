const express           = require('express')
const router            = express.Router()

const upload  = require('../middlewares/upload')
const ProfileController = require('../controllers/ProfileController')

router.get('/show/:userID', ProfileController.getOne)
router.post('/add', upload.single('image'), ProfileController.add)
router.post('/update', ProfileController.update)
router.post('/delete', ProfileController.destroy)

module.exports = router