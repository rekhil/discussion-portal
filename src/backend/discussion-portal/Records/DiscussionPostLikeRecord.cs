using System.ComponentModel.DataAnnotations;

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
