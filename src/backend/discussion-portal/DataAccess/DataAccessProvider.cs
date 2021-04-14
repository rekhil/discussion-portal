using DiscussionPortal.Records;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DiscussionPortal.DataAccess
{
    public class DataAccessProvider : IDataAccessProvider
    {
        private readonly PostgreSqlContext _context;

        public DataAccessProvider(PostgreSqlContext context)
        {
            _context = context;
        }

        public IEnumerable<DiscussionPostRecord> GetAllTopics()
        {
            return _context.DiscussionPosts.Where(x => x.IsTopic).OrderByDescending(x => x.PostId).Include("Tags");
        }

        public DiscussionPostRecord GetTopicDetailsByTopicId(long topicId)
        {
            return _context.DiscussionPosts.FirstOrDefault(t => t.PostId == topicId);
        }

        public IEnumerable<DiscussionPostRecord> GetRepliesByparentId(long parentPostId)
        {
            return _context.DiscussionPosts.Where(t => t.ParentPostId == parentPostId).Include("Likes");
        }

        public DiscussionPostRecord GetPostDetailsByPostId(long postId)
        {
            return _context.DiscussionPosts.FirstOrDefault(t => t.PostId == postId);
        }

        public void CreatePost(DiscussionPostRecord postDetails)
        {
            _context.DiscussionPosts.Add(postDetails);
            _context.SaveChanges();
        }

        public void UpdatePost(DiscussionPostRecord postDetails)
        {
            _context.DiscussionPosts.Update(postDetails);
            _context.SaveChanges();
        }

        public void DeletePost(long postId)
        {
            var entity = _context.DiscussionPosts.FirstOrDefault(t => t.PostId == postId);
            _context.DiscussionPosts.Remove(entity);
            _context.SaveChanges();
        }

        public void CreatePostTag(List<DiscussionPostTagRecord> discussionPostTagRecords)
        {
            _context.DiscussionPostTags.AddRange(discussionPostTagRecords);
            _context.SaveChanges();
        }
    }
}
