using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionPortal.Records
{
    public class DiscussionPostLikeRecord
    {
        [Key]
        public long DiscussionPostId { get; set; }

        [Key]
        public string UserName { get; set; }

        public bool IsLike { get; set; }

        public DiscussionPostRecord DiscussionPost { get; set; }
    }
}
