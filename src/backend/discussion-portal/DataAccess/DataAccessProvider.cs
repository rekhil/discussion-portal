using DiscussionPortal.Records;
using Microsoft.EntityFrameworkCore;
using System;
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
            return _context.DiscussionPosts.Where(x => x.IsTopic).OrderByDescending(x => x.PostId).Include("Tags").Include("Likes");
        }

        public int GetTotalTopicsCount()
        {
            return _context.DiscussionPosts.Where(x => x.IsTopic).Count();
        }

        //Used to get count topics with tag filtering
        public int GetTotalTopicsCountWithTags(List<string> searchTags)
        {
            List<DiscussionPostRecord> filteredDiscussionPosts = new List<DiscussionPostRecord>();

            //Get the full list of data
            var discussionPosts = _context.DiscussionPosts.Where(x => x.IsTopic).Include("Tags").ToList();

            //Return Tagged count are chosen
            if (searchTags != null && searchTags.Any())
            {
                foreach (var discussionPost in discussionPosts)
                {
                    var tagList = discussionPost.Tags.Select(x => x.Tag).ToList();
                    if (tagList.Any(x => searchTags.Contains(x)))
                    {
                        filteredDiscussionPosts.Add(discussionPost);
                    }
                }

                return filteredDiscussionPosts.Count;
            }
            else //Else return full count
            {
                return discussionPosts.Count;
            }
        }

        public IEnumerable<DiscussionPostRecord> SearchTopics(int pageNumber, int pageSize)
        {
            return _context.DiscussionPosts.Where(x => x.IsTopic).OrderByDescending(x => x.PostId).Skip((pageNumber - 1) * pageSize)
                 .Take(pageSize).Include("Tags").Include("Likes");
        }

        //Used to get topics with tag filtering and pagination
        public IEnumerable<DiscussionPostRecord> SearchTopicsWithTags(int pageNumber, int pageSize, List<string> searchTags)
        {
            List<DiscussionPostRecord> filteredDiscussionPosts = new List<DiscussionPostRecord>();

            //Get the full list of data
            var discussionPosts = _context.DiscussionPosts.Where(x => x.IsTopic).Include("Tags").Include("Likes").ToList();

            //Filter them based on tags if Tags are chosen
            if (searchTags != null && searchTags.Any())
            {
                foreach (var discussionPost in discussionPosts)
                {
                    var tagList = discussionPost.Tags.Select(x => x.Tag).ToList();
                    if (tagList.Any(x => searchTags.Contains(x)))
                    {
                        filteredDiscussionPosts.Add(discussionPost);
                    }
                }

                return filteredDiscussionPosts.OrderByDescending(x => x.PostId).Skip((pageNumber - 1) * pageSize).Take(pageSize);
            }
            else //Else return without tag filtering
            {
                return discussionPosts.OrderByDescending(x => x.PostId).Skip((pageNumber - 1) * pageSize).Take(pageSize);
            }
        }

        public DiscussionPostRecord GetTopicDetailsByTopicId(long topicId)
        {
            return _context.DiscussionPosts.Where(t => t.PostId == topicId).Include("Tags").Include("Likes").FirstOrDefault();
        }

        public IEnumerable<DiscussionPostRecord> GetRepliesByParentId(long parentPostId)
        {
            return _context.DiscussionPosts.Where(t => t.ParentPostId == parentPostId).Include("Tags").Include("Likes");
        }

        public DiscussionPostRecord GetPostDetailsByPostId(long postId)
        {
            return _context.DiscussionPosts.Where(t => t.PostId == postId).Include("Tags").Include("Likes").FirstOrDefault();
        }

        public void CreatePost(DiscussionPostRecord postDetails)
        {
            _context.DiscussionPosts.Add(postDetails);

            IncreaseParentReplyCount(postDetails);

            _context.SaveChanges();
        }

        private void IncreaseParentReplyCount(DiscussionPostRecord post)
        {
            if (post.ParentPostId.GetValueOrDefault() > 0)
            {
                var parentPost = GetPostDetailsByPostId(post.ParentPostId.Value);

                parentPost.ReplyCount += 1;

                _context.DiscussionPosts.Update(parentPost);

                IncreaseParentReplyCount(parentPost);
            }
        }

        public void UpdatePost(DiscussionPostRecord postDetails)
        {
            _context.DiscussionPosts.Update(postDetails);
            _context.SaveChanges();
        }

        public void DeletePost(long postId)
        {
            var entity = _context.DiscussionPosts.FirstOrDefault(t => t.PostId == postId);

            var parentEntities = new List<DiscussionPostRecord>();

            PopulateParentList(entity, parentEntities);

            RemoveRelations(postId);

            _context.DiscussionPosts.Remove(entity);

            DecreaseReplyCount(parentEntities);

            DeleteReplyPosts(entity, parentEntities);

            _context.SaveChanges();
        }

        private void PopulateParentList(DiscussionPostRecord entity, List<DiscussionPostRecord> parentEntities)
        {
            if (entity.ParentPostId.GetValueOrDefault() > 0)
            {
                var parent = GetPostDetailsByPostId(entity.ParentPostId.Value);

                parentEntities.Add(parent);

                PopulateParentList(parent, parentEntities);
            }
        }

        private void DecreaseReplyCount(List<DiscussionPostRecord> parentEntities)
        {
            parentEntities.ForEach(x =>
            {
                x.ReplyCount -= 1;
                _context.DiscussionPosts.Update(x);
            });
        }

        private void RemoveRelations(long postId)
        {
            var tags = _context.DiscussionPostTags.Where(x => x.DiscussionPostId == postId);

            foreach (var tag in tags)
                _context.DiscussionPostTags.Remove(tag);

            var likes = _context.DiscussionPostLikes.Where(x => x.DiscussionPostId == postId);

            foreach (var like in likes)
                _context.DiscussionPostLikes.Remove(like);
        }

        private void DeleteReplyPosts(DiscussionPostRecord postDetails, List<DiscussionPostRecord> parentEntities)
        {
            var children = _context.DiscussionPosts.Where(t => t.ParentPostId == postDetails.PostId).ToList();

            if (children?.Any() != true)
                return;

            children.ForEach(x =>
            {
                RemoveRelations(x.PostId);
                _context.DiscussionPosts.Remove(x);
                DecreaseReplyCount(parentEntities);
                DeleteReplyPosts(x, parentEntities);
            });
        }

        public void CreatePostTag(List<DiscussionPostTagRecord> discussionPostTagRecords)
        {
            _context.DiscussionPostTags.AddRange(discussionPostTagRecords);
            _context.SaveChanges();
        }

        public IEnumerable<UserDto> SearchUser(string q)
        {
            return _context.Users.Where(t => (t.UserName.Contains(q) || t.FirstName.Contains(q) || t.LastName.Contains(q) || t.Email.Contains(q)) && t.IsActive == true);
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
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.Email = user.Email;
                existingUser.IsAdmin = user.IsAdmin;
                existingUser.Password = user.Password;
                existingUser.IsActive = true;
                _context.Users.Update(existingUser);
            }
            else
            {
                user.IsActive = true;
                _context.Users.Add(user);
            }
            _context.SaveChanges();
        }

        public void EditUser(UserDto user)
        {
            var existingUser = _context.Users.FirstOrDefault(t => t.UserName == user.UserName && t.IsActive == true);
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.Email = user.Email;
            existingUser.IsAdmin = user.IsAdmin;
            existingUser.IsActive = true;
            _context.Users.Update(existingUser);
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
            return _context.DiscussionPostLikes.FirstOrDefault(t => (t.DiscussionPostId == discussionPostId) && (t.UserName == userName));
        }
    }
}
