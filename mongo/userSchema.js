const mongoose = require("mongoose")
const { Schema } = mongoose

const user = new Schema({
    userName: String,
    creator: String,
    activeStatus: Boolean,
    password: String,
    isClosedProfile: Boolean,
    avatarURL: String,
    about: String,
    description: String,
    age: Number,
    country: String,
    city: String,
    gender: String,
    arrayOfFollowers: Array,
    arrayOfFollowing: Array,
    arrayOfPosts: Array
})

const userSchema = mongoose.model('users', user)

module.exports = userSchema
