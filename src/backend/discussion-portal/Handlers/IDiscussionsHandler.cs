using DiscussionPortal.Models;
using System.Collections.Generic;

namespace DiscussionPortal.Handlers
{
    public interface IDiscussionsHandler
    {
        IEnumerable<DiscussionPost> GetAllTopics();

        DiscussionPost GetTopicDetailsByTopicId(string topicId);

        ResponseModel CreatePost(DiscussionPost postDetails);

        ResponseModel UpdatePost(string postId, DiscussionPost postDetails);

        ResponseModel DeletePost(string postId);
    }
}
