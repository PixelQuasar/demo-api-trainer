const express = require("express")
const app = express()
const mongoose = require("mongoose")
const config = require("./static_data/config.json")
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require("multer")

//APP SETTING
app.use(multer({
    dest: ".//assets/media"
  }).single("file"))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      //res.contentType('application/json')
      next()
  })
  app.use(cors())


//MONGO SETTING
mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// function of event on mongodb connection open
mongoose.connection.once('open', async () => {
    // listen http express server
    app.listen(config.APIPort, '0.0.0.0', (err) => {
        if (err) return new Error(`error in starting server, error: ${err}`)
        else console.log(`server started on \nPORT: ${config.APIPort}\nURL: ${config.serverURL}`)
    })
    //USER CONTROLLER
    app.use("/users", require("./endpoints/userController.js"))

    //POST CONTROLLER
    app.use("/posts", require("./endpoints/postController.js"))
})