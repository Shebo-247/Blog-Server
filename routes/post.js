const express           = require('express')
const router            = express.Router()

const PostController    = require('../controllers/PostController')
const upload            = require('../middlewares/upload')

router.get('/showAll', PostController.showAll)
router.get('/show/:postID', PostController.showOne)
router.post('/add', upload.single('image'), PostController.add)
router.post('/update', PostController.update)
router.post('/delete', PostController.destroy)

module.exports = router