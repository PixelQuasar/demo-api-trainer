const userSchema = require("../mongo/userSchema")

userSchema

class User {
    constructor() {
        this.userName = "default"
        this.creator = "unknown"
    }
}