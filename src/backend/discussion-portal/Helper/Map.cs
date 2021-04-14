using DiscussionPortal.Models;
using DiscussionPortal.Records;

namespace DiscussionPortal.Helper
{
    public static class Map
    {
        public static DiscussionPostRecord MapDiscussionPostToRecord(DiscussionPost discussionPost)
        {
            return new DiscussionPostRecord
            {
                PostId = discussionPost.PostId,
                ParentPostId = discussionPost.ParentPostId,
                Subject = discussionPost.Subject,
                PostDescription = discussionPost.PostDescription,
                IsTopic = discussionPost.IsTopic,
                CreatedBy = discussionPost.CreatedBy,
                CreatedOn = discussionPost.CreatedOn,
                LastUpdatedOn = discussionPost.LastUpdatedOn,
                LikeCount = discussionPost.LikeCount,
                DisLikeCount = discussionPost.DisLikeCount,
                ReplyCount = discussionPost.ReplyCount,
                Views = discussionPost.Views
            };
        }

        public static DiscussionPost MapRecordToDiscussionPost(DiscussionPostRecord record)
        {
            return new DiscussionPost
            {
                PostId = record.PostId,
                ParentPostId = record.ParentPostId,
                Subject = record.Subject,
                PostDescription = record.PostDescription,
                IsTopic = record.IsTopic,
                CreatedBy = record.CreatedBy,
                CreatedOn = record.CreatedOn,
                LastUpdatedOn = record.LastUpdatedOn,
                LikeCount = record.LikeCount,
                DisLikeCount = record.DisLikeCount,
                ReplyCount = record.ReplyCount,
                Views = record.Views
            };
        }

        public static UserDto MapUserToRecord(this User user)
        {
            return new UserDto
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
        }

        public static User MapRecordToUser(this UserDto userRecord)
        {
            return new User
            {
                UserName = userRecord.UserName,
                FirstName = userRecord.FirstName,
                LastName = userRecord.LastName,
                Email = userRecord.Email
            };
        }
    }
}
