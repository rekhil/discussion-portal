# Discussion Portal
Discussion portals are key to speed-up the communication across communities of people. They help to organize the community appropriately.

This project was generated with Angular CLI version 8.0.2.

# API Details 

Get all topic list

GET : https://xenon-anvil-310308.appspot.com/api/discussions


Create new post (topic/reply)

POST : https://xenon-anvil-310308.appspot.com/api/discussions

Request :
{
   "subject":"Subject",
   "postDescription":"Description",
   "isTopic":true,
   "createdBy":"rekhil"
}


Get topic details by Id

GET : https://xenon-anvil-310308.appspot.com/api/discussions/1


Update existing post

PUT: https://xenon-anvil-310308.appspot.com/api/discussions/1

Request :
{
   "subject":"Subject",
   "postDescription":"Description"
}


Delete exisintg post (Selected post/reply and all replies under it will get deleted)

DELETE: https://xenon-anvil-310308.appspot.com/api/discussions/1
