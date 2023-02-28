# API for beginners training

some documentation to work with this API

# Users:

## POST /user/addUser

Add one user to DB

### body (json):
    "userName": "demoName",
	"creator": "Quasarity",
	"activeStatus": true,
	"isClosedProfile": false,
	"avatarURL": "https://site/pic",
	"about": "Hi i'm demo!",
	"description": "That's first account in database to test API work",
	"country": "Narnia",
	"city": "Erebor",
	"age": 8,
	"gender": "Male",
	"arrayOfFollowers": [],
	"arrayOfPosts": []
	
### Responce:
    200 OK | user has created
    
## POST /user/updateUser

Update one user to DB by id

### body (json):
	"id": "123123",
	"payload": {
		"userName": "demoName",
		"creator": "Quasarity",
		"activeStatus": true,
		"isClosedProfile": false,
		"avatarURL": "https://site/pic",
		"about": "Hi i'm demo!",
		"description": "That's first account in database to test API work",
		"country": "Narnia",
		"city": "Erebor",
		"age": 8,
		"gender": "Male",
		"arrayOfFollowers": [],
		"arrayOfPosts": []
	}
	
### Responce:
    200 OK | user has updated
    
## POST /user/deleteUser

Delete one user by id

### body (json):
	"id": "123123",
	
### Responce:
    200 OK | user has deleted
    
## GET /user/getAllUsers

Return array of all users.

### params:
    none
	
### Responce:
    [
        { User },
        { User },
        { User }
    ]
    
## GET user/findUsers

Return array of users by filter

### body (json):
    {
        "key": "value"
    }
	
### Responce:
    [
        { User },
        { User },
        { User }
    ]


## GET /user/getUserById/:id

Return one specific user by its id

### params:
    id - id of user.
	
### Responce:
    {
        "_id": "63f70515ddf6ab6f74d1617d",
	    "userName": "demoName",
	    "creator": "Quasarity",
	    "activeStatus": true,
	    "isClosedProfile": false,
	    "avatarURL": "https://site/pic",
	    "about": "Hi i'm demo!",
	    "description": "That's first account in database to test API work",
	    "age": 8,
	    "country": "Narnia",
	    "city": "Erebor",
	    "gender": "Male",
	    "arrayOfFollowers": [],
	    "arrayOfPosts": [],
	    "__v": 0
    }
    
    
## POST /user/addFollower

Add follower to target user

### body (json):
	"targetId": "123123",
	"friendId": "456456",
	
### Responce:
    200 OK 