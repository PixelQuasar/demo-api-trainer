const mongoose = require("mongoose")
const { Schema } = mongoose

const user = new Schema({
    userName: String,
    creator: String,
    activeStatus: Boolean,
    isClosedProfile: Boolean,
    avatarURL: String,
    about: String,
    description: String,
    age: Number,
    country: String,
    city: String,
    gender: String,
    arrayOfFriends: Array,
    arrayOfPosts: Array
})

const userSchema = mongoose.model('users', user)

module.exports = userSchema
