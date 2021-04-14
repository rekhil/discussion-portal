using DiscussionPortal.Records;
using System.Collections.Generic;

namespace DiscussionPortal.DataAccess
{
    public interface IDataAccessProvider
    {
        IEnumerable<DiscussionPostRecord> GetAllTopics();

        int GetTotalTopicsCount();

        IEnumerable<DiscussionPostRecord> SearchTopics(int pageNumber, int pageSize);

        DiscussionPostRecord GetTopicDetailsByTopicId(long topicId);

        IEnumerable<DiscussionPostRecord> GetRepliesByParentId(long parentPostId);

        DiscussionPostRecord GetPostDetailsByPostId(long postId);

        void CreatePost(DiscussionPostRecord postDetails);

        void UpdatePost(DiscussionPostRecord postDetails);

        void DeletePost(long postId);
      
        void CreatePostTag(List<DiscussionPostTagRecord> discussionPostTagRecords);
      
        IEnumerable<UserDto> SearchUser(string q);

        UserDto FindUser(string userName);

        void CreateUser(UserDto user);

        void EditUser(UserDto user);

        void DeleteUser(string userName);

        //Methods for DiscussionPostLikes
        void CreateDiscussionPostLike(DiscussionPostLikeRecord discussionPostLike);
        void UpdateDiscussionPostLike(DiscussionPostLikeRecord discussionPostLike);
        void DeleteDiscussionPostLike(string userName, long discussionPostId);

        DiscussionPostLikeRecord GetDiscussionPostLike(string userName, long discussionPostId);
    }
}