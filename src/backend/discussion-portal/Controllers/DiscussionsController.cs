using DiscussionPortal.Handlers;
using DiscussionPortal.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace discussion_portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionsController : ControllerBase
    {
        private readonly IDiscussionsHandler _discussionsHandler;

        public DiscussionsController()
        {
            _discussionsHandler = new DiscussionsHandler();
        }

        [HttpGet]
        public IEnumerable<DiscussionPost> Get()
        {
            return _discussionsHandler.GetAllTopics();
        }

        [HttpGet("{topicId}")]
        public DiscussionPost Get(int topicId)
        {
            return _discussionsHandler.GetTopicDetailsByTopicId(topicId);
        }

        [HttpPost]
        public ResponseModel Post([FromBody] DiscussionPost postDetails)
        {
            return _discussionsHandler.CreatePost(postDetails);
        }

        [HttpPut("{postId}")]
        public ResponseModel Put(int postId, [FromBody] DiscussionPost postDetails)
        {
            return _discussionsHandler.UpdatePost(postId, postDetails);
        }

        [HttpDelete("{postId}")]
        public ResponseModel Delete(int postId)
        {
            return _discussionsHandler.DeletePost(postId);
        }
    }
}
