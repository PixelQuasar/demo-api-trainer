const mongoose = require("mongoose")
const { Schema } = mongoose

const user = new Schema({
    userName: String,
    creator: String,
    status: String,
    avatarURL: String,
    about: String,
    age: Number,
})

const userSchema = mongoose.model('users', user)

module.exports = userSchema
