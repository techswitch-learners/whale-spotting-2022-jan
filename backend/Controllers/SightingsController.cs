using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Helpers;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using Microsoft.AspNetCore.Http;
namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/sightings")]

    public class SightingsController : ControllerBase
    {
        private readonly IAuthService _authservice;
        private readonly ISightingsRepo _sightingsRepo;

        private readonly IUsersRepo _usersRepo;
        public SightingsController(
            IAuthService authservice,
            ISightingsRepo sightingsRepo,
            IUsersRepo usersRepo
        )
        {
            _authservice = authservice;
            _sightingsRepo = sightingsRepo;
            _usersRepo = usersRepo;
        }

        [HttpGet("")]
        public ActionResult<List<Sighting>> GetAllSightings()
        {

            return _sightingsRepo.GetAllSightings();
        }

        [HttpGet("recent")]
        public ActionResult<Sighting> GetMostRecentSighting()
        {

            return _sightingsRepo.GetMostRecentSighting();
        }

        [HttpPost]
        [Route("create")]
        public ActionResult Create([FromBody] CreateSightingRequest newSighting, [FromHeader(Name = "Authorization")] string authHeader)
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
            
            if (user.Id != newSighting.UserId)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to create a post for a different user"
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                var sighting = _sightingsRepo.Create(newSighting);
                return Created("/", newSighting);
            }
            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not create post"
                );
            }
        }


        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id, [FromHeader(Name = "Authorization")] string authHeader)
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


            User user = _usersRepo.GetByUsername(username);
            var sighting = _sightingsRepo.GetById(id);
            if (user.Id != sighting.CreatedByUserId)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to delete other people's sightings..."
                );
            }


            _sightingsRepo.Delete(id);
            return Ok();
        }
    }

}