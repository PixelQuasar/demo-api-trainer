function confirmUser(object) {
    const keys = [
        "userName",
        "creator",
        "activeStatus",
        "isClosedProfile",
        "avatarURL",
        "about",
        "description",
        "age",
        "country",
        "city",
        "gender",
        "arrayOfFollowers",
        "arrayOfPosts"
    ]

    for (let key of keys){
        if (key in object == false) return false
    }

    return true
}

module.exports = confirmUser