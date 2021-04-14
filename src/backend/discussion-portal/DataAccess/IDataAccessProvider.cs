using DiscussionPortal.Records;
using System.Collections.Generic;

namespace DiscussionPortal.DataAccess
{
    public interface IDataAccessProvider
    {
        IEnumerable<DiscussionPostRecord> GetAllTopics();

        DiscussionPostRecord GetTopicDetailsByTopicId(long topicId);

        DiscussionPostRecord GetPostDetailsByPostId(long postId);

        void CreatePost(DiscussionPostRecord postDetails);

        void UpdatePost(DiscussionPostRecord postDetails);

        void DeletePost(long postId);

        void CreatePostTag(List<DiscussionPostTagRecords> discussionPostTagRecords);
    }
}
