using DiscussionPortal.Records;
using System.Collections.Generic;

namespace DiscussionPortal.DataAccess
{
    public interface IDataAccessProvider
    {
        IEnumerable<DiscussionPostRecord> GetAllTopics();

        DiscussionPostRecord GetTopicDetailsByTopicId(string topicId);

        void CreatePost(DiscussionPostRecord postDetails);

        void UpdatePost(DiscussionPostRecord postDetails);

        void DeletePost(string postId);
    }
}
