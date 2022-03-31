using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response
{
    public class ReducedUserResponse
    {
    private readonly User _user;

        public ReducedUserResponse(User user)
        {
            _user = user;
        }
        public UserType Role => _user.Role;
    }
}