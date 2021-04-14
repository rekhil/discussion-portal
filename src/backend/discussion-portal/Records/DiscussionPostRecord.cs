using System;
using System.ComponentModel.DataAnnotations;

namespace DiscussionPortal.Records
{
    public class DiscussionPostRecord
    {
        [Key]
        public string PostId { get; set; }

        public string ParentPostId { get; set; }

        public string Subject { get; set; }

        public string PostDescription { get; set; }

        public bool IsTopic { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? LastUpdatedOn { get; set; }

        public int LikeCount { get; set; }

        public int DisLikeCount { get; set; }

        public int ReplyCount { get; set; }

        public int Views { get; set; }
    }
}
