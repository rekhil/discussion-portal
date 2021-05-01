namespace DiscussionPortal.Models
{
    public class User
    {
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        internal string Password { get; set; }
    }
}