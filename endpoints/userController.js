const express = require("express")
const router = express.Router()
const userSchema = require("../mongo/userSchema")
const postSchema = require("../mongo/postSchema")
const confirmUser = require("../scripts/confirmUser")

router.get('/getUserById/:userId', async (req, res) => {
    const id = req.params.userId
    try {
        const targetUser = await userSchema.findOne({ _id: id }).lean().exec()
        res.json(targetUser)
    }
    catch {
        console.log("endpoints - userController - getUserBuId error:", error)
        res.send(500)
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await userSchema.find({}).lean().exec()
        res.status(200).json(users)
    }
    catch {
        console.log("endpoints - userController - getAllUsers error:", error)
        res.send(500)
    }
})

router.get('/findUsers', async (req, res) => {
    const filter = req.body
    try {
        const users = await userSchema.find(filter).lean().exec()
        res.status(200).json(users)
    }
    catch (error) {
        console.log("endpoints - userController - findUsers error:", error)
        res.status(500).send("Error: invalid filter.")
    }
})

router.post('/addUser', async (req, res) => {
    const content = req.body
    if (confirmUser(content)) {
        try {
            const newUserSchema = new userSchema(content)
            const mongoResponse = await newUserSchema.save()
            console.log(mongoResponse)
            res.status(200)
        }
        catch (error) {
            console.log("endpoints - userController - addUser error:", error)
            res.status(500).send("error: unknown error")
        }
    }
    else {
        res.status(500).send("Error: invalid keys")
    }
})

router.post('/updateUser', async (req, res) => {
    const content = req.body.payload
    const userId = req.body.id
    if (confirmUser(content)) {
        try {
            const mongoResponse = await newUserSchema.updateOne(userId, { $set: content })
            console.log(mongoResponse)
            res.status(200)
        }
        catch (error) {
            console.log("endpoints - userController - updateUser error:", error)
            res.status(500).send("error: unknown error")
        }
    }
    else {
        res.status(500).send("Error: invalid keys")
    }
})

router.post('/deleteUser', async (req, res) => {
    const userId = req.body.id
    try {
        const mongoResponse = await newUserSchema.deleteOne({ _id: userId })
        console.log(mongoResponse)
        res.status(200)
    }
    catch (error) {
        console.log("endpoints - userController - deleteUser error:", error)
        res.status(500).send("error: unknown error")
    }
})

router.post('/addFollower', async (req, res) => {
    const content = req.body
    const targetUser = content.targetId
    const targetFollower = content.friendId

    try {
        const mongoResponse = await UserSchema.update({ _id: targetUser, $push: targetFollower })
        console.log(mongoResponse)
        res.status(200)
    }
    catch (error) {
        console.log("endpoints = userController - addFollower error:", error)
        res.status(500).send(error)
    }
})

router.get("/demo", async (req, res) => {
    console.log("demo!")
    res.json({ demo: "demo!" })
})

module.exports = router


