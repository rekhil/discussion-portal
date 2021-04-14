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

        IEnumerable<UserDto> SearchUser(string q);

        UserDto FindUser(string userName);

        void CreateUser(UserDto user);

        void EditUser(UserDto user);

        void DeleteUser(string userName);
    }
}