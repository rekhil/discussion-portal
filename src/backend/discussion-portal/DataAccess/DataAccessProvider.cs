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
            return _context.DiscussionPosts.Where(t => t.ParentPostId == parentPostId);
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
        
        public IEnumerable<UserDto> SearchUser(string q)
        {
            return _context.Users.Where(t => ( t.UserName.Contains(q) || t.FirstName.Contains(q) || t.LastName.Contains(q) || t.Email.Contains(q)) && t.IsActive == true);
        }

        public UserDto FindUser(string userName)
        {
            return _context.Users.FirstOrDefault(t => t.UserName == userName && t.IsActive == true);
        }

        public void CreateUser(UserDto user)
        {
            var existingUser = _context.Users.FirstOrDefault(t => t.UserName == user.UserName);
            if (existingUser != null)
            {
                existingUser.IsActive = true;
                _context.Users.Update(existingUser);
            }
            else
            {
                user.IsActive = true;
                user.Password = "password";
                _context.Users.Add(user);
            }
            _context.SaveChanges();
        }

        public void EditUser(UserDto user)
        {
            user.IsActive = true;
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void DeleteUser(string userName)
        {
            var entity = _context.Users.FirstOrDefault(t => t.UserName == userName);
            entity.IsActive = false;
            _context.Users.Update(entity);
            _context.SaveChanges();
        }

        //DiscussionPostLike: Create
        public void CreateDiscussionPostLike(DiscussionPostLikeRecord discussionPostLike)
        {
            _context.DiscussionPostLikes.Add(discussionPostLike);
            _context.SaveChanges();
        }

        //DiscussionPostLike: Update
        public void UpdateDiscussionPostLike(DiscussionPostLikeRecord discussionPostLike)
        {
            _context.DiscussionPostLikes.Update(discussionPostLike);
            _context.SaveChanges();
        }

        //DiscussionPostLike: Delete
        public void DeleteDiscussionPostLike(string userName, long discussionPostId)
        {
            var entity = _context.DiscussionPostLikes.FirstOrDefault(t => (t.DiscussionPostId == discussionPostId) && (t.UserName == userName));
            _context.DiscussionPostLikes.Remove(entity);
            _context.SaveChanges();
        }

        //DiscussionPostLike: Get
        public DiscussionPostLikeRecord GetDiscussionPostLike(string userName, long discussionPostId)
        {
            return _context.DiscussionPostLikes.FirstOrDefault(t => (t.DiscussionPostId == discussionPostId) && (t.UserName == userName) );
        }
    }
}
