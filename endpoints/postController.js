const express = require("express")
const router = express.Router()
const confirmPost = require("../scripts/confirmUser")
const PostSchema = require("../mongo/postSchema")
const UserSchema = require("../mongo/userSchema")

router.get('/getPostById/:postId', async (req, res) => {
    const id = req.params.postId
    try {
        const targetPost = await PostSchema.findOne({ _id: id }).lean().exec()
        res.json(targetPost)
    }
    catch (error) {
        console.log("endpoints - postController - getPostById error:", error)
        res.status(500).send("unknown error.")
    }
})

router.get('/getPostsByFilter', async (req, res) => {
    const filter = req.body.filter
    try {
        const mongoResponse = await PostSchema.find(filter).lean().exec()
        res.status(200).json(mongoResponse)
    }
    catch (error) {
        console.log("endpoints - postController - findPostsByFilter error:", error)
        res.status(403).send(error)
    }
})

router.post('/deletePostsByFilter', async (req, res) => {
    const filter = req.body.filter
    try {
        const mongoResponse = await PostSchema.deleteMany(filter).lean().exec()
        res.status(200).json(mongoResponse)
    }
    catch (error) {
        console.log("endpoints - postController - deletePostsByFilter error:", error)
        res.status(403).send(error)
    }
})

router.post('/likePost/:postId', async (req, res) => {
    const id = req.params.postId
    try {
        const mongoResponse = await PostSchema.findOneAndUpdate({_id: id}, {'$inc': {"numberOflikes": 1}}).lean().exec()
        res.status(200).json(mongoResponse)
    }
    catch (error) {
        console.log("endpoints - postController - likePost error:", error)
        res.status(403).send(error)
    }
})


/*
example:
{
    text: "demo",
    embedPhotoURL: "https://pic",
    authorId: "123456"
}
*/
router.post('/createPost', async (req, res) => {
    const payload = req.body
    const content = {
        isReply: false,
        originalPostId: "",
        text: payload.text,
        embedPhotosURL: payload.embedPhotosURL,
        authorId: payload.authorId,
        dateCreated: (new Date()).toLocaleDateString(),
        timeCreated: (new Date()).toLocaleTimeString(),
        numberOflikes: 0,
        numberOfViews: 0,
        numberOfReplies: 0,
        replyIds: [],
    }
    try {
        const newPostSchema = new PostSchema(content)
        const mongoPostResponse = await newPostSchema.save() // saves the object to post collection
        const mongoUserResponse = await UserSchema.findOneAndUpdate({ _id: payload.authorId}, {$push: {"arrayOfPosts": mongoPostResponse._id }}).lean().exec()

        console.log(mongoPostResponse)
        console.log(mongoUserResponse)
        res.status(200).send(mongoPostResponse)
    }
    catch (error) {
        console.log("endpoints - postController - addPost error:", error)
        res.status(403).send(error)
    }
})

module.exports = router