using DiscussionPortal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionPortal.Handlers
{
    public interface IUsersHandler
    {

        IEnumerable<User> SearchUser(string q);

        User FindUser(string userName);

        ResponseModel CreateUser(User user);

        ResponseModel UpdateUser( User user);

        ResponseModel DeleteUser(string userName);
    }
}
