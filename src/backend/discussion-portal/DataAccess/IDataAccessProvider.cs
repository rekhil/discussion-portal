using DiscussionPortal.Records;
using System.Collections.Generic;

namespace DiscussionPortal.DataAccess
{
    public interface IDataAccessProvider
    {
        IEnumerable<DiscussionPostRecord> GetAllTopics();

        DiscussionPostRecord GetTopicDetailsByTopicId(long topicId);

        void CreatePost(DiscussionPostRecord postDetails);

        void UpdatePost(DiscussionPostRecord postDetails);

        void DeletePost(long postId);
    }
}
