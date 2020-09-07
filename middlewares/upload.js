const multer        = require('multer')
const path          = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback){
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
            callback(null, true)
        } else{
            console.log("Only JPG and PNG supported")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload