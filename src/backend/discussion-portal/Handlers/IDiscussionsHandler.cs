using DiscussionPortal.Models;
using System.Collections.Generic;

namespace DiscussionPortal.Handlers
{
    public interface IDiscussionsHandler
    {
        IEnumerable<DiscussionPost> GetAllTopics();

        DiscussionPost GetTopicDetailsByTopicId(long topicId);

        ResponseModel CreatePost(DiscussionPost postDetails);

        ResponseModel UpdatePost(long postId, DiscussionPost postDetails);

        ResponseModel DeletePost(long postId);
    }
}
