# Discussion Portal
Discussion portals are key to speed-up the communication across communities of people. They help to organize the community appropriately.

UI: Angular CLI version 8.0.2

API: .Net Core 2.1

Datebase: PostgreSQL 

Angular package published in: https://www.npmjs.com/package/ngx-community

Deployed using Google Cloud Platform

Deployed URL: https://discussion-portal-ui-311719.df.r.appspot.com/


# API Details 

# Discussions

Search all topics with pagination and filtering
Note: If filtering by tags are not needed, set "Tags" field as null

POST: https://xenon-anvil-310308.appspot.com/api/discussions/search

Request :
{
    "Tags": ["Science","History","General"],
    "PageNumber": 1,
    "PageSize": 5
}

---------------------------------------------------------------------------------------------------------------------

Get all topic list

GET: https://xenon-anvil-310308.appspot.com/api/discussions

---------------------------------------------------------------------------------------------------------------------

Create new post (topic/reply)

POST: https://xenon-anvil-310308.appspot.com/api/discussions

Request :
{
   "subject":"Subject",
   "postDescription":"Description",
   "tags":[
      "tag1",
      "tag2"
   ],
   "isTopic":true,
   "createdBy":"rekhil"
}

---------------------------------------------------------------------------------------------------------------------

Get topic details by Id

GET: https://xenon-anvil-310308.appspot.com/api/discussions/1

---------------------------------------------------------------------------------------------------------------------

Update existing post (Current user can only update post created by the same user)

PUT: https://xenon-anvil-310308.appspot.com/api/discussions/1

Request :
{
   "subject":"Subject",
   "postDescription":"Description",
   "tags":[
      "tag1",
      "tag2"
   ]
}

---------------------------------------------------------------------------------------------------------------------

Delete exisintg post (Current user can only edit post created by the same user, Selected post/reply and all replies under it will get deleted)

DELETE: https://xenon-anvil-310308.appspot.com/api/discussions/1

---------------------------------------------------------------------------------------------------------------------

Like/Dislike Post (UpdatePostLikeStatus):

POST: https://xenon-anvil-310308.appspot.com/api/discussions/UpdatePostLikeStatus

Request:
{
    "DiscussionPostId" : 2,
    "UserName" : "benosushil",
    "IsLike" : true
}

# User

Get User By User Name. This can be used for log in also

GET: https://xenon-anvil-310308.appspot.com/api/users/benosushil => here benosushil is user name

---------------------------------------------------------------------------------------------------------------------

Search User 

POST: https://xenon-anvil-310308.appspot.com/api/users/search

Request (just a string): "beno"

---------------------------------------------------------------------------------------------------------------------

Create User: 

POST: https://xenon-anvil-310308.appspot.com/api/users

Request : 
{
    "userName": "benosushil",
    "firstName": "Benedict",
    "lastName": "Kumar",
    "email": "ben@ben.com",
    "password" : "beno",
    "isAdmin" : false
}

Note : IsAdmin field changes are yet to be deployed


---------------------------------------------------------------------------------------------------------------------

Edit User:

PUT: url and request (except password field) are same as of create user except http verb

---------------------------------------------------------------------------------------------------------------------

Delete User: 

DELETE: https://xenon-anvil-310308.appspot.com/api/users/ben . Here ben is user name

---------------------------------------------------------------------------------------------------------------------

Login User:

HttpPost : https://xenon-anvil-310308.appspot.com/api/users/login
Request :
{
    "userName": "benosushil",
    "Password": "beno"
}

---------------------------------------------------------------------------------------------------------------------

User Password Reset :

HttpPut: https://xenon-anvil-310308.appspot.com/api/users/password/reset
Request : 
{
    "userName": "benosushil",
    "Password": "beno",
    "NewPassword": "sushil"
}
