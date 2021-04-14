using DiscussionPortal.Handlers;
using DiscussionPortal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersHandler _usersHandler;

        public UsersController(IUsersHandler usersHandler)
        {
            _usersHandler = usersHandler;
        }

        [HttpGet]
        [Route("{userName}")]
        public User GetById (string userName)
        {
            return _usersHandler.FindUser(userName);
        }

        [HttpPost]
        [Route("search")]
        public IEnumerable<User> SearchUsers([FromBody] SearchFilter q)
        {
            return _usersHandler.SearchUser(q.SearchText);
        }

        [HttpPost]
        public ResponseModel Create([FromBody] User user)
        {
            return _usersHandler.CreateUser(user);
        }

        [HttpPut]
        public ResponseModel Edit([FromBody] User user)
        {
            return _usersHandler.UpdateUser(user);
        }

        [HttpDelete]
        [Route("{userName}")]
        public ResponseModel Delete(string userName)
        {
            return _usersHandler.DeleteUser(userName);
        }
    }
}
