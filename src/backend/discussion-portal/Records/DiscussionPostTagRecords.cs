using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionPortal.Records
{
    public class DiscussionPostTagRecords
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long DiscussionPostTagId { get; set; }

        public long DiscussionPostId { get; set; }

        public string Tag { get; set; }
    }
}
