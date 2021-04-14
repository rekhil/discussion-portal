using DiscussionPortal.Models;
using System.Collections.Generic;
using System.Net;

namespace DiscussionPortal.Handlers
{
    public class DiscussionsHandler : IDiscussionsHandler
    {
        public IEnumerable<DiscussionPost> GetAllTopics()
        {
            return new List<DiscussionPost> {
                new DiscussionPost{ Subject = "ABC", PostDescription = "Test Descripton1" },
                new DiscussionPost{ Subject = "Test2", PostDescription = "Test Descripton2" }
            };
        }

        public DiscussionPost GetTopicDetailsByTopicId(int topicId)
        {
            return new DiscussionPost { Subject = "TestABC", PostDescription = "Test Descripton1" };
        }

        public ResponseModel CreatePost(DiscussionPost postDetails)
        {
            return new ResponseModel { IsSuccess = true, Id = 1, StatusCode = HttpStatusCode.OK };
        }

        public ResponseModel UpdatePost(int postId, DiscussionPost postDetails)
        {
            return new ResponseModel { IsSuccess = true, Id = 1, StatusCode = HttpStatusCode.OK };
        }

        public ResponseModel DeletePost(int postId)
        {
            return new ResponseModel { IsSuccess = true, Id = 1, StatusCode = HttpStatusCode.OK };
        }

    }
}
