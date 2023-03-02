const express = require("express")
const router = express.Router()
const UserSchema = require("../mongo/userSchema")
const PostSchema = require("../mongo/postSchema")
const confirmUser = require("../scripts/confirmUser")
const { mongo } = require("mongoose")

router.get('/getUserById/:userId', async (req, res) => {
    const id = req.params.userId
    try {
        const targetUser = await UserSchema.findOne({ _id: id }).lean().exec()
        res.json(targetUser)
    }
    catch {
        console.log("endpoints - userController - getUserBuId error:", error)
        res.send(500).send("Error: unknown error")
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {
        const mongoResponse = await UserSchema.find({}).lean().exec()
        res.status(200).json(mongoResponse)
    }
    catch {
        console.log("endpoints - userController - getAllUsers error:", error)
        res.send(500).send()
    }
})

router.get('/findUsersByFilter', async (req, res) => {
    const filter = req.body.filter
    try {
        const mongoResponse = await UserSchema.find(filter).lean().exec()
        res.status(200).json(mongoResponse)
    }
    catch (error) {
        console.log("endpoints - userController - findUsers error:", error)
        res.status(403).send(error)
    }
})

router.get('/findFollowers', async (req, res) => {
    const arrayOfFollowers = req.body
    try {
        const mongoResponse = await UserSchema.find().where('_id').in(arrayOfFollowers).exec()
        res.status(200).json(mongoResponse)
    }
    catch (error) {
        console.log("endpoints - userController - findFollowers error:", error)
        res.status(403).send(error)
    }
})

router.post('/addUser', async (req, res) => {
    const content = req.body
    if (confirmUser(content)) {
        try {
            const newUserSchema = new UserSchema(content)
            const mongoResponse = await newUserSchema.save()
            console.log(mongoResponse)
            res.status(200).send(mongoResponse)
        }
        catch (error) {
            console.log("endpoints - userController - addUser error:", error)
            res.status(403).send(error)
        }
    }
    else {
        res.status(500).send("error: invalid keys")
    }
})

router.post('/updateUser', async (req, res) => {
    const content = req.body.payload
    const userId = req.body.id
    if (confirmUser(content)) {
        try {
            const mongoResponse = await UserSchema.updateOne(userId, { $set: content })
            console.log(mongoResponse)
            res.status(200).send(mongoResponse)
        }
        catch (error) {
            console.log("endpoints - userController - updateUser error:", error)
            res.status(403).send(error)
        }
    }
    else {
        res.status(403).send("Error: invalid keys")
    }
})

router.post('/deleteUser', async (req, res) => {
    const userId = req.body.id
    try {
        const mongoResponse = await UserSchema.deleteOne({ _id: userId })
        console.log(mongoResponse)
        res.status(200).send()
    }
    catch (error) {
        console.log("endpoints - userController - deleteUser error:", error)
        res.status(403).send(error)
    }
})

router.post('/deleteUsersByFilter', async (req, res) => {
    const filter = req.body.filter
    try {
        const mongoResponse = await UserSchema.deleteMany(filter).lean().exec()
        console.log(mongoResponse)
        res.status(200).send(mongoResponse)
    }
    catch (error) {
        console.log("endpoints - userController - deleteUser error:", error)
        res.status(500).send("error: unknown error")
    }
})

router.post('/follow', async (req, res) => {
    const content = req.body
    const targetFollowing = content.targetId
    const targetFollower = content.friendId

    try {
        const followingMongoResponse = await UserSchema.updateOne({ _id: targetFollowing, $push: { "arrayOfFollowers": targetFollower} })
        const followerMongoResponse = await UserSchema.updateOne({ _id: targetFollower, $push: { "arrayOfFollowing": targetFollowing })
        console.log(followerMongoResponse, followingMongoResponse)
        res.status(200).send()
    }
    catch (error) {
        console.log("endpoints = userController - follow error:", error)
        res.status(500).send(error)
    }
})

router.post("/login", async (req, res) => {
    const password = parseInt(req.body.password)
    const login = req.body.userName
    try{
        const mongoResponse = await UserSchema.find({"userName": login, "password": password}).lean().exec()
        if (mongoResponse.length == 0) throw "Error: incorrect login or password"
        console.log(mongoResponse)
        res.status(200).send(mongoResponse)
    }
    catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
})

router.get("/demo", async (req, res) => {
    console.log("demo!")
    res.json({ demo: "demo!" })
})

module.exports = router


