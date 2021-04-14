using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionPortal.Records
{
    public class DiscussionPostTagRecord
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long DiscussionPostTagId { get; set; }

        public long DiscussionPostId { get; set; }

        public string Tag { get; set; }

        public DiscussionPostRecord DiscussionPost { get; set; }
    }
}
