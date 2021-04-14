using DiscussionPortal.Models;
using System.Collections.Generic;

namespace DiscussionPortal.Handlers
{
    public interface IDiscussionsHandler
    {
        IEnumerable<DiscussionPost> GetAllTopics();

        DiscussionPost GetTopicDetailsByTopicId(int topicId);

        ResponseModel CreatePost(DiscussionPost postDetails);

        ResponseModel UpdatePost(int postId, DiscussionPost postDetails);

        ResponseModel DeletePost(int postId);
    }
}
