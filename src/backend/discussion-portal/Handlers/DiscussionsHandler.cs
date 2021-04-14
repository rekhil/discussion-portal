using DiscussionPortal.DataAccess;
using DiscussionPortal.Helper;
using DiscussionPortal.Models;
using DiscussionPortal.Records;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace DiscussionPortal.Handlers
{
    public class DiscussionsHandler : IDiscussionsHandler
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public DiscussionsHandler(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        public IEnumerable<DiscussionPost> GetAllTopics()
        {
            var discussionList = _dataAccessProvider.GetAllTopics();

            return discussionList.Select(x => Map.MapRecordToDiscussionPost(x));
        }

        public DiscussionPost GetTopicDetailsByTopicId(long topicId)
        {
            var discussion = _dataAccessProvider.GetTopicDetailsByTopicId(topicId);

            var post = Map.MapRecordToDiscussionPost(discussion);

            SetReplyPosts(post);

            return post;
        }

        private void SetReplyPosts(DiscussionPost discussionPost)
        {
            var replyPosts = _dataAccessProvider.GetRepliesByparentId(discussionPost.PostId);

            if (replyPosts?.Any() != true)
                return;

            discussionPost.ReplyPosts = replyPosts.Select(x => Map.MapRecordToDiscussionPost(x)).ToList();

            discussionPost.ReplyPosts.ForEach(x =>
            {
                SetReplyPosts(x);
            });
        }

        public ResponseModel CreatePost(DiscussionPost postDetails)
        {
            try
            {
                postDetails.CreatedOn = DateTime.Now;

                var record = Map.MapDiscussionPostToRecord(postDetails);

                record.Tags = postDetails.Tags?.Select(x => new DiscussionPostTagRecord
                {
                    Tag = x
                }).ToList();

                _dataAccessProvider.CreatePost(record);

                return new ResponseModel
                {
                    Id = record.PostId,
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new ResponseModel
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.InternalServerError,
                    Error = ex.Message
                };
            }
        }

        public ResponseModel UpdatePost(long postId, DiscussionPost postDetails)
        {
            try
            {
                var existingRecord = _dataAccessProvider.GetPostDetailsByPostId(postId);

                existingRecord.Subject = postDetails.Subject;
                existingRecord.PostDescription = postDetails.PostDescription;
                existingRecord.LastUpdatedOn = DateTime.Now;

                _dataAccessProvider.UpdatePost(existingRecord);

                return new ResponseModel
                {
                    Id = existingRecord.PostId,
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new ResponseModel
                {
                    Id = postId,
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.InternalServerError,
                    Error = ex.Message
                };
            }
        }

        public ResponseModel DeletePost(long postId)
        {
            try
            {
                _dataAccessProvider.DeletePost(postId);

                return new ResponseModel
                {
                    Id = postId,
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new ResponseModel
                {
                    Id = postId,
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.InternalServerError,
                    Error = ex.Message
                };
            }
        }

        //Used when a user likes/dislikes a post. Creates/Updates DiscussionPostLikes table
        public ResponseModel UpdatePostLikeStatus(UpdatePostLikeStatusInputModel updatePostLikeStatusInputModel)
        {
            try
            {
                //Get DiscussionPostLike data
                var discussionPostLike = _dataAccessProvider.GetDiscussionPostLike(updatePostLikeStatusInputModel.UserName, updatePostLikeStatusInputModel.DiscussionPostId);

                if(discussionPostLike == null)
                {
                    //Add a row in DiscussionPostLikes table
                    DiscussionPostLikeRecord newRecord = new DiscussionPostLikeRecord()
                    {
                        DiscussionPostId = updatePostLikeStatusInputModel.DiscussionPostId,
                        UserName = updatePostLikeStatusInputModel.UserName,
                        IsLike = updatePostLikeStatusInputModel.IsLike
                    };
                    _dataAccessProvider.CreateDiscussionPostLike(newRecord);
                }
                else
                {
                    //Update IsLike value for that DiscussionPostLike row
                    discussionPostLike.IsLike = updatePostLikeStatusInputModel.IsLike;
                    _dataAccessProvider.UpdateDiscussionPostLike(discussionPostLike);
                }

                return new ResponseModel
                {
                    Id = updatePostLikeStatusInputModel.DiscussionPostId,
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new ResponseModel
                {
                    Id = updatePostLikeStatusInputModel.DiscussionPostId,
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.InternalServerError,
                    Error = ex.Message
                };
            }
        }
    }
}
