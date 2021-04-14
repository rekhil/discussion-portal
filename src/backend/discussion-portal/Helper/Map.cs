using DiscussionPortal.Models;
using DiscussionPortal.Records;
using System.Linq;

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
                ReplyCount = discussionPost.ReplyCount,
                Views = discussionPost.Views
            };
        }

        public static DiscussionPost MapRecordToDiscussionPost(DiscussionPostRecord record)
        {
            var likes = record.Likes?.Where(x => x.IsLike);
            var dislikes = record.Likes?.Where(x => !x.IsLike);

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
                LikeCount = likes?.Any() == true ? likes.Count() : 0,
                LikedUsers = likes?.Any() == true ? likes.Select(x => x.UserName).Distinct().ToArray() : null,
                DisLikeCount = dislikes?.Any() == true ? dislikes.Count() : 0,
                DisLikedUsers = dislikes?.Any() == true ? dislikes.Select(x => x.UserName).Distinct().ToArray() : null,
                ReplyCount = record.ReplyCount,
                Views = record.Views,
                Tags = record.Tags?.Select(x => x.Tag)?.ToArray()
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
