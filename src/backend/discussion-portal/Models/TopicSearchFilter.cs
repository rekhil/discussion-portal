namespace DiscussionPortal.Models
{
    public class TopicSearchFilter
    {
        public string SearchText { get; set; }

        public int? PageNumber { get; set; }

        public int? PageSize { get; set; }
    }
}
