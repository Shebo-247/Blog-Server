const express           = require('express')
const router            = express.Router()
const authenticate      = require('../middlewares/authenticate')

const AuthController    = require('../controllers/AuthController')

router.get('/:username', AuthController.getUser)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/checkUsername/:username', AuthController.checkUsername)
router.get('/checkEmail/:email', AuthController.checkEmail)

module.exports = router