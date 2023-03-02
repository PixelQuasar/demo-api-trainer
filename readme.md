# API for beginners training

some documentation to work with this API

# Users:

## User Schema:
    userName: String,
    password: String,
    creator: String,
    activeStatus: Boolean,
    isClosedProfile: Boolean,
    avatarURL: String,
    about: String,
    description: String,
    age: Number,
    country: String,
    city: String,
    gender: String,
    arrayOfFollowers: Array,
    arrayOfPosts: Array

## POST /users/addUser

Add one user to DB

### body (json):
	{
		obj User
	}
	
### Responce:
    200 OK | user has created
    
## POST /users/updateUser

Update one user to DB by id

### body (json):
	"id": id,
	"payload": {
		obj User //new atributes
	}
	
### Responce:
    200 OK | user has updated
    
## POST /users/deleteUser

Delete one user by id

### body (json):
	"id": id,
	
### Responce:
    200 OK | user has deleted


## POST /users/deleteUsersByFilter

Delete many users by filter

### body (json):
	"filter": {
		"id": id,
	}
	
### Responce:
    200 OK | users has deleted

    
## GET /users/getAllUsers

Return array of all users.

### params:
    none
	
### Responce:
    [
        obj User,
        obj User,
        obj User
    ]
    
## POST users/findUsersByFilter

Return array of users by filter

### body (json):
    "fiter": {
        "key": "value"
    }
	
### Responce:
    [
        obj User,
        obj User,
        obj User
    ]


## GET users/findFollowers

Return array of followers by id array

### body (json):
    "array": []
	
### Responce:
    [
        obj User,
        obj User,
        obj User
    ]


## GET /users/getUserById/:id

Return one specific user by its id

### params:
    id - id of user.
	
### Responce:
    {
		obj User
    }
    
    
## POST /users/follow

Follow to user

### body (json):
	"targetFollower": id,
	"friendFollowing": id,
	
### Responce:
    200 OK 

## POST /users/login

### body (json):
    "userName": "name",
    "password": "qwerty123"

### Responce:
    {
        obj User
    }

# Posts:

## Post Schema:
    isReply: Boolean,
    originalPostId: String,
    text: String,
    embedPhotosURL: Array,
    authorId: String,
    dateCreated: String,
    timeCreated: String,
    numberOflikes: Number,
    numberOfViews: Number,
    numberOfReplies: Number,
    replyIds: Array,

## GET /posts/getPostById/:postId

### params:
	postId - id of post

### responce:
	{
		obj Post
	}


## POST /posts/getPostsByFilter

Return an object or array of objects by filter.

### body:
	{
		"filter": {
			"_id": id
		}
	}

### responce:
	[
		obj Post,
		obj Post,
		obj Post
	]


## POST /posts/createPost

Add post by Schema to DB

## body:

	{
	    text: "demo",
	    embedPhotoURL: "https://pic",
    	authorId: id
	}

## responce:
	{
		obj Post
	}


## POST /posts/deletePostByFilter

Delete an object or array of objects by filter.

### body:
	{
		"filter": {
			"_id": id
		}
	}

### responce:
	[
		obj Post,
		obj Post,
		obj Post
	]


## POST /posts/likePost/:postId

Add +1 like to selected post.

### params:
	postId - id of post

### responce:
	{
		obj Post
	}

