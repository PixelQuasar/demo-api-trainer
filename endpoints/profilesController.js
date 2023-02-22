const express = require("express")
const router = express.Router()
const userSchema = require("../mongo/userSchema")

router.get('/getById/:userId', async (req, res) => {
    const id = req.params.userId
    const targetUser = await userSchema.findOne({_id: id}).lean().exec()
    res.json(targetUser)
})

router.get('/getAllUsers', async (req, res) => {
    const users = await userSchema.find({ }).lean().exec()
    res.json(users)
})

router.post('/addUser', async (req, res) => {
    const newUserSchema = new userSchema(req.body)
    const response = newUserSchema.save()
    console.log(response)
    res.status(200)
})

