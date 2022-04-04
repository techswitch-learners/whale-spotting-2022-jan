using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Repositories;
using System;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepo _users;
        private readonly IAuthService _authservice;

        public UsersController(
          IUsersRepo users,
          IAuthService authservice
        )
        {
            _users = users;
            _authservice = authservice;
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserRequest userRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newUser = _users.Create(userRequest);

            return Created("/api", newUser);
        }

        [HttpGet("{username}")]
        public ActionResult<ReducedUserResponse> GetUser([FromRoute] string username)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var user = new User();
            try
            {
                user = _users.GetByUsername(username);
            }
            catch (InvalidOperationException)
            {
                return StatusCode(
                    StatusCodes.Status401Unauthorized,
                    "The given username is not valid"
                );
            }
            
            return new ReducedUserResponse(user);
        }

        [HttpPatch("{id}/update/role")]
        public ActionResult<ReducedUserResponse> UpdateRole([FromRoute] int id, [FromBody] UpdateUserRoleRequest update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var authHeader = Request.Headers["Authorization"];

            if (authHeader == StringValues.Empty)
            {
                return new UnauthorizedResult();
            }

            string username = AuthHelper.GetUsernamePassword(authHeader).Split(":")[0];
            string usernamePassword = AuthHelper.GetUsernamePassword(authHeader);

            var user = new User();
            try
            {
                user = _users.GetByUsername(username);
            }

            catch (InvalidOperationException)
            {
                return StatusCode(
                    StatusCodes.Status401Unauthorized,
                    "The given username is not valid"
                );
            }
            
            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            
            if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to update a user's admin status"
                );
            }

            try
            {
                var userUpdate = _users.UpdateRole(id, update);
                return new ReducedUserResponse(userUpdate);
            }

            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not update user role"
                );
            }
        }
    }
}
