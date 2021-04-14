# Discussion Portal
Discussion portals are key to speed-up the communication across communities of people. They help to organize the community appropriately.

UI: Angular CLI version 8.0.2.
API: .Net Core 2.1
Datebase: PostgreSQL 

# API Details 
---------------------------------------------------------------------------------------------------------------------
Get all topic list

GET : https://xenon-anvil-310308.appspot.com/api/discussions

---------------------------------------------------------------------------------------------------------------------

Create new post (topic/reply)

POST : https://xenon-anvil-310308.appspot.com/api/discussions

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

GET : https://xenon-anvil-310308.appspot.com/api/discussions/1

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
