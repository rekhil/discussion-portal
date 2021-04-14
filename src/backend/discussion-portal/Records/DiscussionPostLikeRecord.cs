namespace DiscussionPortal.Records
{
    public class DiscussionPostLikeRecord
    {
        public long DiscussionPostId { get; set; }

        public string UserName { get; set; }

        public bool IsLike { get; set; }

        public DiscussionPostRecord DiscussionPost { get; set; }
    }
}
