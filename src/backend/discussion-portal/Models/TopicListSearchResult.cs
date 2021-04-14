using System.Collections.Generic;

namespace DiscussionPortal.Models
{
    public class TopicListSearchResult
    {
        public IEnumerable<DiscussionPost> TopicList { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public int TotalItemCount { get; set; }

        public int TotalPageCount { get; set; }
    }
}
