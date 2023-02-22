const express = require("express")
const app = express()
const mongoose = require("mongoose")


mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// function of event on mongodb connection open
mongoose.connection.once('open', async () => {
    // listen http express server
    app.listen(config.apiPort, '0.0.0.0', (err) => {
        if (err) return new Error(`error in starting server, error: ${err}`)
        else console.log(`server started on \nPORT: ${config.PORT}\nURL: ${config.serverUrl}`)
    })

    app.use("/profiles", require("./endpoints/profilesController.js"))
})