using DiscussionPortal.Records;
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
            return _context.DiscussionPosts.ToList();
        }

        public DiscussionPostRecord GetTopicDetailsByTopicId(string topicId)
        {
            return _context.DiscussionPosts.FirstOrDefault(t => t.PostId == topicId);
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

        public void DeletePost(string postId)
        {
            var entity = _context.DiscussionPosts.FirstOrDefault(t => t.PostId == postId);
            _context.DiscussionPosts.Remove(entity);
            _context.SaveChanges();
        }
    }
}
