# API for beginners training

some documentation to work with this API

# Users:

## /user/addUser

Adding one user to user DB

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
	"arrayOfFriends": [],
	"arrayOfPosts": []
	
### Responce:
    200 OK | user has created
    
    
## /user/getAllUsers

Return array of all users.

### params:
    none
	
### Responce:
    [
        { User },
        { User },
        { User }
    ]
    
    
## /user/getUserById/:id

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
	    "arrayOfFriends": [],
	    "arrayOfPosts": [],
	    "__v": 0
    }
    
    
