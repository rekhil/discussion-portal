using System.Collections.Generic;

namespace DiscussionPortal.Models
{
    public class SearchFilter
    {
        public string SearchText { get; set; }

        public List<string> Tags { get; set; }

        public int? PageNumber { get; set; }

        public int? PageSize { get; set; }
    }
}
