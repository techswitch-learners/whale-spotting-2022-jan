using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class UpdateUserRoleRequest
    {
        public UserType Role { get; set; }
    }
}