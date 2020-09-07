const Post = require('../models/Post')

// GET ALL
const showAll = (req, res, next) => {
    Post.find().then(response => {
        console.log('inside show all')
        return res.json({ response })
    }).catch(error => {
        res.json({ error })
    })
}

// GET SPECIFIC
const showOne = (req, res, next) => {
    let postID = req.params.postID
    Post.findById(postID).then(response => {
        return res.json({ response })
    }).catch(error => {
        res.json({ error })
    })
}

// ADDING
const add = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    })
    if (req.file) {
        post.image = req.file.path
    }

    post.save().then(post => {
        res.json({ message: 'Post added successfully' })
    }).catch(error => {
        res.json({ error })
    })
}

// UPDATING
const update = (req, res, next) => {
    let postID = req.body.postID

    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    }

    Post.findByIdAndUpdate(postID, { $set: updatedPost }).then(post => {
        res.json({ message: 'Post updated successfully' })
    }).catch(error => {
        res.json({ error })
    })
}

// DELETING
const destroy = (req, res, next) => {
    let postID = req.body.postID

    Post.findByIdAndRemove(postID).then(post => {
        res.json({ message: 'Post deleted successfully' })
    }).catch(error => {
        res.json({ error })
    })
}

module.exports = { showAll, showOne, add, update, destroy }