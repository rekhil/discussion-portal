namespace DiscussionPortal.Models
{
    public class SearchFilter
    {
        public string SearchText { get; set; }

        public int? PageNumber { get; set; }

        public int? PageSize { get; set; }
    }
}
