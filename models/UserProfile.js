const mongoose = require("mongoose")

const UserProfile = new mongoose.Schema({
    _id: { type: String },
    name: { type: String },
    image: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('UserProfile', UserProfile)