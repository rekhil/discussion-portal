﻿using DiscussionPortal.Records;
using System.Collections.Generic;

namespace DiscussionPortal.DataAccess
{
    public interface IDataAccessProvider
    {
        IEnumerable<DiscussionPostRecord> GetAllTopics();

        DiscussionPostRecord GetTopicDetailsByTopicId(long topicId);

        IEnumerable<DiscussionPostRecord> GetRepliesByparentId(long parentPostId);

        DiscussionPostRecord GetPostDetailsByPostId(long postId);

        void CreatePost(DiscussionPostRecord postDetails);

        void UpdatePost(DiscussionPostRecord postDetails);

        void DeletePost(long postId);

        void CreatePostTag(List<DiscussionPostTagRecord> discussionPostTagRecords);
    }
}
