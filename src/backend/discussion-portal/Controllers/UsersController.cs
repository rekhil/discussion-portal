using DiscussionPortal.Handlers;
using DiscussionPortal.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;

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
        public User GetById(string userName)
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
        public ResponseModel Create([FromBody] CreateUserRequest user)
        {
            user.Password = HashPassword(user.Password);
            User newUser = user;
            newUser.Password = user.Password;
            return _usersHandler.CreateUser(newUser);
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

        [HttpPut]
        [Route("password/reset")]
        public ResponseModel PasswordReset(PasswordReset user)
        {
            var login = Login(user);
            if (!login.IsSuccess)
            {
                return login;
            }
            var hashPassword = HashPassword(user.NewPassword);
            var existingUser = _usersHandler.FindUser(user.UserName);
            existingUser.Password = hashPassword;
            return _usersHandler.CreateUser(existingUser);
        }

        [HttpPost]
        [Route("login")]
        public ResponseModel Login(UserLogin user)
        {
            var hashPassword = HashPassword(user.Password);
            var existingUser = GetById(user.UserName);
            if (string.IsNullOrEmpty(existingUser?.UserName))
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Error = "Invalid user name"
                };
            }
            if (existingUser.Password == hashPassword)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Error = "Invalid user name or password"
                };
            }
            return new ResponseModel();
        }

        private string HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(password, 10, 10, HashAlgorithmName.SHA256))
            {
                var key = Convert.ToBase64String(algorithm.GetBytes(10));
                var salt = Convert.ToBase64String(algorithm.Salt);
                return $"{key}.{salt}";
            }
        }
    }
}