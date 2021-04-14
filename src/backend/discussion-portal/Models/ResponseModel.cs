using System.Net;

namespace DiscussionPortal.Models
{
    public class ResponseModel
    {
        public long Id { get; set; }

        public bool IsSuccess { get; set; }

        public HttpStatusCode StatusCode { get; set; }

        public string Error { get; set; }
    }
}
