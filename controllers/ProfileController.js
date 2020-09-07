const UserProfile = require('../models/UserProfile')

// get user
const getOne = (req, res, next) => {
    let userID = req.params.userID

    UserProfile.findById(userID).then(user => {
        return res.json({ response: user })
    }).catch(error => {
        res.json({ error })
    })
}

// add user
const add = (req, res, next) => {
    const user = new UserProfile({
        _id: req.body._id,
        name: req.body.name,
    })
    if (req.file) {
        user.image = req.file.path
    }

    user.save().then(user => {
        res.json({ message: 'User created successfully' })
    }).catch(error => {
        res.json({ error })
    })
}

// update user
const update = (req, res, next) => {
    let userID = req.body.userID

    const updatedData = new UserProfile({
        _id: req.body._id,
        name: req.body.name,
    })

    UserProfile.findByIdAndUpdate(userID, { $set: updatedData }).then(() => {
        res.json({ message: 'User updated successfully' })
    }).catch(error => {
        res.json({ error })
    })
}

// delete user
const destroy = (req, res, next) => {
    let userID = req.body.userID

    UserProfile.findByIdAndRemove(userID).then(() => {
        res.json({ message: 'User deleted successfully' })
    }).catch(error => {
        res.json({ error })
    })
}

module.exports = {getOne, add, update, destroy}