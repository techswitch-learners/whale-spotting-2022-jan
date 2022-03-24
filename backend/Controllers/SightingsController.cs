using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Helpers;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;

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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return _sightingsRepo.GetAllSightings();
        }

        [HttpGet("recent")]
        public ActionResult<Sighting> GetMostRecentSighting()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

            var encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
            string usernamePassword = AuthHelper.Base64Decode(encodedUsernamePassword);
            string username = usernamePassword.Split(":")[0];

            User user = _usersRepo.GetByUsername(username);

            try
            {
                var check = _authservice.IsAuthenticated(usernamePassword);
                if (!check)
                    return new UnauthorizedResult();
                else
                {
                    var sighting = _sightingsRepo.Create(newSighting);
                    return Created("/", newSighting);
                }
            }
            catch (Exception)
            {
                return new UnauthorizedResult();
            }

        }
    }

}