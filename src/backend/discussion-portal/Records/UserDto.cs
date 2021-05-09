﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionPortal.Records
{
    public class UserDto
    {
        [Key]
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        public string Password { get; set; }

        public bool IsActive { get; set; }
    }
}