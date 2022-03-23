using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Controllers {
  [ApiController]
  [Route("/users")]
  public class UsersController : ControllerBase {
    private readonly IUsersRepo _users;

    public UsersController(
      IUsersRepo users
    ) {
      _users = users;
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] CreateUserRequest userRequest) {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      var newUser = _users.Create(userRequest);

      return Created("/api", newUser);
    }
  }
}
