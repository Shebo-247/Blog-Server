const jwt       = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, '$Haw?$mnk*')

        req.user = decoded
        next()
        
    } catch (error) {
        res.json({error: 'Authentication Failed'})
    }
}

module.exports = authenticate