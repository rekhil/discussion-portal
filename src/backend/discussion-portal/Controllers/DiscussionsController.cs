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

        public DiscussionsController(IDiscussionsHandler discussionsHandler)
        {
            _discussionsHandler = discussionsHandler;
        }

        [HttpGet]
        public IEnumerable<DiscussionPost> Get()
        {
            return _discussionsHandler.GetAllTopics();
        }

        [HttpPost("{search}")]
        public ActionResult<TopicListSearchResult> SearchTopics([FromBody] TopicSearchFilter topicSearchFilter)
        {
            if (topicSearchFilter == null)
                return BadRequest();

            return Ok(_discussionsHandler.SearchTopics(topicSearchFilter));
        }

        [HttpGet("{topicId}")]
        public DiscussionPost Get(long topicId)
        {
            return _discussionsHandler.GetTopicDetailsByTopicId(topicId);
        }

        [HttpPost]
        public ResponseModel Post([FromBody] DiscussionPost postDetails)
        {
            return _discussionsHandler.CreatePost(postDetails);
        }

        [HttpPut("{postId}")]
        public ResponseModel Put(long postId, [FromBody] DiscussionPost postDetails)
        {
            return _discussionsHandler.UpdatePost(postId, postDetails);
        }

        [HttpDelete("{postId}")]
        public ResponseModel Delete(long postId)
        {
            return _discussionsHandler.DeletePost(postId);
        }

        
        [Route("UpdatePostLikeStatus")]
        [HttpPost]
        public ResponseModel UpdatePostLikeStatus([FromBody] UpdatePostLikeStatusInputModel updatePostLikeStatusInputModel)
        {
            return _discussionsHandler.UpdatePostLikeStatus(updatePostLikeStatusInputModel);
        }
    }
}
