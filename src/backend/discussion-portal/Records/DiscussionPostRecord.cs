using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionPortal.Records
{
    public class DiscussionPostRecord
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long PostId { get; set; }

        public long? ParentPostId { get; set; }

        public string Subject { get; set; }

        public string PostDescription { get; set; }

        public bool IsTopic { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? LastUpdatedOn { get; set; }

        public int ReplyCount { get; set; }

        public int Views { get; set; }

        public List<DiscussionPostTagRecord> Tags { get; set; }

        //public List<DiscussionPostLikeRecord> Likes { get; set; }
    }
}
