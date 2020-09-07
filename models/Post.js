const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Post = new Schema({
    title: { type: String },
    content: { type: String },
    author: { type: String },
    image: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Post', Post)