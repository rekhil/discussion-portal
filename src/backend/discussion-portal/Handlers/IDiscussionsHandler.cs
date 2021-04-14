using DiscussionPortal.Models;
using System.Collections.Generic;

namespace DiscussionPortal.Handlers
{
    public interface IDiscussionsHandler
    {
        IEnumerable<DiscussionPost> GetAllTopics();

        TopicListSearchResult SearchTopics(SearchFilter topicSearchFilter);

        DiscussionPost GetTopicDetailsByTopicId(long topicId);

        ResponseModel CreatePost(DiscussionPost postDetails);

        ResponseModel UpdatePost(long postId, DiscussionPost postDetails);

        ResponseModel DeletePost(long postId);

        ResponseModel UpdatePostLikeStatus(UpdatePostLikeStatusInputModel updatePostLikeStatusInputModel);
    }
}
