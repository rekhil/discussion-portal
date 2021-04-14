using System;
using System.Collections.Generic;

namespace DiscussionPortal.Models
{
    public class DiscussionPost
    {
        public int PostId { get; set; }

        public int ParentPostId { get; set; }

        public string[] Tags { get; set; }

        public string Subject { get; set; }

        public string PostDescription { get; set; }

        public bool IsTopic { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime LastUpdatedOn { get; set; }

        public int LikeCount { get; set; }

        public string[] LikedUsers { get; set; }

        public int DisLikeCount { get; set; }

        public string[] DisLikedUsers { get; set; }

        public int ReplyCount { get; set; }

        public string[] RepliedUsers { get; set; }

        public int Views { get; set; }

        public List<DiscussionPost> ReplyPosts { get; set; }
    }
}
