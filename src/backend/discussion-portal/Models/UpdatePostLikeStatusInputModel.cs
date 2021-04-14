using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionPortal.Models
{
    public class UpdatePostLikeStatusInputModel
    {
        public long DiscussionPostId { get; set; }
        public string UserName { get; set; }
        public bool IsLike { get; set; }
    }
}
