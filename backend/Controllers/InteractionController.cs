using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Helpers;
using WhaleSpotting.Models.Database;
using Microsoft.AspNetCore.Http;


namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/interactions")]
    public class InteractionController : ControllerBase
    {
        private readonly IInteractionRepo _interaction;

        private readonly IAuthService _authservice;
        private readonly IUsersRepo _usersRepo;



        public InteractionController(IInteractionRepo interaction, IAuthService authservice, IUsersRepo usersRepo)
        {
            _interaction = interaction;
            _authservice = authservice;
            _usersRepo = usersRepo;
        }

        [HttpPost]
        [Route("create")]
        public ActionResult Create([FromBody] InteractionRequest newInteraction, [FromHeader(Name = "Authorization")] string authHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (authHeader is null)
            {
                return new UnauthorizedResult();
            }

            string username = AuthHelper.GetUsernamePassword(authHeader).Split(":")[0];
            string usernamePassword = AuthHelper.GetUsernamePassword(authHeader);

            var user = new User();

            try
            {
                user = _usersRepo.GetByUsername(username);
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

            try
            {
                var interaction = _interaction.Create(newInteraction, user.Id);
                return Created("/", newInteraction);
            }
            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not create post"
                );
            }
        }
    }
}