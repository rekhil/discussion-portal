using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionPortal.Models
{
    public class CreateUserRequest : User
    {
        public new string Password { get; set; }
    }
}
