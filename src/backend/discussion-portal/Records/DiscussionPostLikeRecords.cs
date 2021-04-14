using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionPortal.Records
{
    public class DiscussionPostLikeRecords
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long DiscussionPostLikeId { get; set; }

        public long DiscussionPostId { get; set; }

        public string User { get; set; }

        public bool IsLike { get; set; }

        public DiscussionPostRecord DiscussionPost { get; set; }
    }
}
