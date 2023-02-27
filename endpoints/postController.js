const express = require("express")
const router = express.Router()
const confirmPost = require("../scripts/confirmUser")
const postSchema = require("../mongo/postSchema")

router.get('/getPostById/:posyId', async (req, res) => {
    const id = req.params.postId
    try {
    const targetPost = await postSchema.findOne({ _id: id }).lean().exec()
    res.json(targetPost)
    }
    catch (error) {
        console.log("endpoints - postController - getPostById error:", error)
        res.status(500).send("unknown error.")
    }
})
