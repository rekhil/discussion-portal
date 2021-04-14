using DiscussionPortal.DataAccess;
using DiscussionPortal.Helper;
using DiscussionPortal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace DiscussionPortal.Handlers
{
    public class UsersHandler : IUsersHandler
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public UsersHandler(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        public IEnumerable<User> SearchUser(string q)
        {
            var users = _dataAccessProvider.SearchUser(q);
            return users?.Select(x => x.MapRecordToUser());
        }

        public User FindUser(string userName)
        {
            return _dataAccessProvider.FindUser(userName)?.MapRecordToUser();
        }

        public ResponseModel CreateUser(User user)
        {
            try
            {
                _dataAccessProvider.CreateUser(user.MapUserToRecord());
                return new ResponseModel
                {
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new ResponseModel
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.InternalServerError,
                    Error = ex.Message + System.Environment.NewLine + "StackTrace : " + ex.StackTrace
                };
            }
        }

        public ResponseModel UpdateUser(User user)
        {
            try
            {
                _dataAccessProvider.EditUser(user.MapUserToRecord());
                return new ResponseModel
                {
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new ResponseModel
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.InternalServerError,
                    Error = ex.Message + System.Environment.NewLine + "StackTrace : " + ex.StackTrace
                };
            }
        }

        public ResponseModel DeleteUser(string userName)
        {
            try
            {
                _dataAccessProvider.DeleteUser(userName);
                return new ResponseModel
                {
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (Exception ex)
            {
                return new ResponseModel
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.InternalServerError,
                    Error = ex.Message + System.Environment.NewLine + "StackTrace : " + ex.StackTrace
                };
            }
        }
    }
}