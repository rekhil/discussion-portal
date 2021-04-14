using DiscussionPortal.DataAccess;
using DiscussionPortal.Helper;
using DiscussionPortal.Models;
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

            return Map.MapRecordToDiscussionPost(discussion);
        }

        public ResponseModel CreatePost(DiscussionPost postDetails)
        {
            postDetails.CreatedOn = DateTime.Now;

            var record = Map.MapDiscussionPostToRecord(postDetails);

            _dataAccessProvider.CreatePost(record);

            return new ResponseModel
            {
                Id = postDetails.PostId,
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
        }

        public ResponseModel UpdatePost(long postId, DiscussionPost postDetails)
        {
            postDetails.PostId = postId;

            postDetails.LastUpdatedOn = DateTime.Now;

            var record = Map.MapDiscussionPostToRecord(postDetails);

            _dataAccessProvider.UpdatePost(record);

            return new ResponseModel
            {
                Id = postDetails.PostId,
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
        }

        public ResponseModel DeletePost(long postId)
        {
            _dataAccessProvider.DeletePost(postId);

            return new ResponseModel
            {
                Id = postId,
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}
