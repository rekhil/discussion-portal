# Discussion Portal : Coconut Talk

Discussion portals are key to speed-up the communication across communities of people. They help to organize the community appropriately.

UI: Angular CLI version 8.0.2

API: .Net Core 2.1

Datebase: PostgreSQL 

Angular package published in: https://www.npmjs.com/package/ngx-community

Deployed using Google Cloud Platform

Portal URL (old): https://discussion-portal-ui-311719.df.r.appspot.com/
Portal URL (new): https://discussion-portal-ui-313302.df.r.appspot.com/

---------------------------------------------------------------------------------------------------------------------

# API Details 

Base URL: https://polar-arbor-313208.appspot.com/

---------------------------------------------------------------------------------------------------------------------

# Discussion APIs

Search all topics with pagination and filtering
Note: If filtering by tags are not needed, set "Tags" field as null

POST: api/discussions/search

Sample request :
{
    "Tags": ["Science","History","General"],
    "PageNumber": 1,
    "PageSize": 5
}

---------------------------------------------------------------------------------------------------------------------

Get all topic list

GET: api/discussions

---------------------------------------------------------------------------------------------------------------------

Create new post 
Note: Can be used to create topics or replies

POST: api/discussions

Sample request :
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

GET: api/discussions/{postId:long}

---------------------------------------------------------------------------------------------------------------------

Update existing post 
Note: Current user can only update post created by the same user

PUT: api/discussions/{postId:long}

Sample request :
{
   "subject":"Subject",
   "postDescription":"Description",
   "tags":[
      "tag1",
      "tag2"
   ]
}

---------------------------------------------------------------------------------------------------------------------

Delete existing post 
Note: Current user can only edit post created by the same user, Selected post/reply and all replies under it will get deleted

DELETE: api/discussions/{postId:long}

---------------------------------------------------------------------------------------------------------------------

Like/Dislike Post (UpdatePostLikeStatus):

POST: api/discussions/UpdatePostLikeStatus

Sample request:
{
    "DiscussionPostId" : 2,
    "UserName" : "benosushil",
    "IsLike" : true
}

---------------------------------------------------------------------------------------------------------------------

# User APIs

Get User By User Name
Note: This can be used for login also

GET: api/users/benosushil => here benosushil is user name

---------------------------------------------------------------------------------------------------------------------

Search User 

POST: api/users/search

Sample request (just a string): 
"beno"

---------------------------------------------------------------------------------------------------------------------

Create User

POST: api/users

Sample request : 
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

Edit User

PUT: url and request (except password field) are same as of create user except http verb

---------------------------------------------------------------------------------------------------------------------

Delete User

DELETE: api/users/ben . Here ben is user name

---------------------------------------------------------------------------------------------------------------------

Login User

POST: api/users/login

Sample request :
{
    "userName": "benosushil",
    "Password": "beno"
}

---------------------------------------------------------------------------------------------------------------------

User Password Reset

PUT: api/users/password/reset

Sample request : 
{
    "userName": "benosushil",
    "Password": "beno",
    "NewPassword": "sushil"
}
