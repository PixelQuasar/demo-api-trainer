const mongoose = require("mongoose")
const { Schema } = mongoose

const post = new Schema({
    isReply: Boolean,
    originalPostId: String,
    text: String,
    embedPhotosURL: Array,
    authorId: String,
    dateCreated: String,
    timeCreated: String,
    numberOflikes: Number,
    numberOfViews: Number,
    numberOfReplies: Number,
    replyIds: Array,
})

const postSchema = mongoose.model('posts', post)

module.exports = postSchema
