function confirmPost(object) {
    const keys = [
        "isReply",
        "originalPostId",
        "text",
        "embedPhotosURL",
        "password",
        "authorId",
        "dateCreated",
        "timeCreated",
        "numberOflikes",
        "numberOfViews",
        "numberOfReplies",
        "replyIds"
    ]

    for (let key of keys){
        if (key in object == false) return false
    }

    return true
}

module.exports = confirmPost