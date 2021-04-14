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
    }
}
