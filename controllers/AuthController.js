const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// GET USER
const getUser = (req, res, next) => {
    User.findOne({username: req.params.username}).then(user => {
        return res.json({user})
    }).catch(error => {
        return res.json({ error })
    })
}

// REGISTER
const register = (req, res, next) => {
    // encrypt the password
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({ error: err })
        }

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        user.save().then(user => {
            res.json({ message: 'User created successfully' })
        }).catch(err => {
            res.json({ error: err })
        })
    })
}

// LOGIN
const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    // login either
    User.findOne({ $or: [{ email: username }, { username: username }] })
        .then(user => {
            if (user) {
                // if username exist, then check the password
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({ error: err })
                    }

                    if (result) {
                        // if password correct, create token
                        let token = jwt.sign(
                            { username: user.username },
                            '$Haw?$mnk*',       // this must be comlex and secret
                            { expiresIn: '1h' }
                        )

                        return res.status(200).json({
                            messgae: 'Logged in successfully',
                            token
                        })
                    }
                    else {
                        return res.status(403).json({ error: 'Password incorrect' })
                    }
                })
            }
            else {
                return res.status(500).json({ message: 'Username not exist' })
            }
        })
}

// CHECK USERNAME
const checkUsername = (req, res, next) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (user) {
                return res.json({ status: true })
            } else {
                return res.json({ status: false })
            }
        })
        .catch(error => {
            res.json({ error })
        })
}

// CHECK EMAIL ADDRESS
const checkEmail = (req, res, next) => {
    User.findOne({ email: req.params.email })
        .then(user => {
            if (user) {
                return res.json({ status: true })
            } else {
                return res.json({ status: false })
            }
        })
        .catch(error => {
            res.json({ error })
        })
}

module.exports = { getUser, register, login, checkUsername, checkEmail }