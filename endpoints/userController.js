const express = require("express")
const router = express.Router()
const userSchema = require("../mongo/userSchema")
const confirmUser = require("../scripts/confirmUser")

router.get('/getUserById/:userId', async (req, res) => {
    const id = req.params.userId
    const targetUser = await userSchema.findOne({ _id: id }).lean().exec()
    res.json(targetUser)
})

router.get('/getAllUsers', async (req, res) => {
    const users = await userSchema.find({}).lean().exec()
    res.status(200).json(users)
})

router.get('/findUsers', async (req, res) => {
    const filter = req.body
    try {
        const users = await userSchema.find(filter).lean().exec()
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).send("Error: invalid filter.")
    }
})


router.post('/addUser', async (req, res) => {
    const content = req.body
    if (confirmUser(content)) {
        try {
            const newUserSchema = new userSchema(content)
            const response = await newUserSchema.save()
            console.log(response)
            res.status(200).send("User has created!")
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

router.get("/demo", async (req, res) => {
    console.log("demo!")
    res.json({ demo: "demo!" })
})

module.exports = router