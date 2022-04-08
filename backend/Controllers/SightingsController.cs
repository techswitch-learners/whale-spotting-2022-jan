using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Helpers;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using Microsoft.AspNetCore.Http;
using WhaleSpotting.Models.Response;
using System.Linq;

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
        public ActionResult<List<ExtendedSightingResponse>> GetAllSightings()
        {

            return _sightingsRepo.GetAllSightings()
            .Select( s => new ExtendedSightingResponse
            {
                Id = s.Id,
                Date = s.Date,
                Location = new Location
                    {
                       Id = s.LocationId,
                       Name = s.Location.Name,
                       Latitude = s.Location.Latitude,
                       Longitude = s.Location.Longitude,
                       Description = s.Location.Description,
                       Amenities = s.Location.Amenities
                    },
                Description = s.Description,
                Species = new Species
                    {
                        Id = s.SpeciesId,
                        Name = s.Species.Name,
                        LatinName = s.Species.LatinName,
                        PhotoUrl = s.Species.PhotoUrl,
                        Description = s.Species.Description,
                        EndangeredStatusId = s.Species.EndangeredStatusId
                    },
                PhotoUrl = s.PhotoUrl,
                User = new UserResponse
                    {
                        Id = s.CreatedByUserId,
                        Name = s.CreatedBy.Name,
                        Email = s.CreatedBy.Email,
                        Username = s.CreatedBy.Username

                    },
                ApprovedBy = s.ApprovedBy != null
                    ?   new UserResponse
                        {
                            Id = s.ApprovedBy.Id,
                            Name = s.ApprovedBy.Name,
                            Email = s.ApprovedBy.Email,
                            Username = s.ApprovedBy.Username
                        }
                    : null,
            }).ToList();
        }

        [HttpGet("recent")]
        public ActionResult<ExtendedSightingResponse> GetMostRecentSighting()
        {
            var s = _sightingsRepo.GetMostRecentSighting();
            var result = new ExtendedSightingResponse
            {
                Id = s.Id,
                Date = s.Date,
                Location = new Location
                    {
                        Id = s.LocationId,
                        Name = s.Location.Name,
                        Latitude = s.Location.Latitude,
                        Longitude = s.Location.Longitude,
                        Description = s.Location.Description,
                        Amenities = s.Location.Amenities
                    },
                Description = s.Description,
                Species = new Species
                    {
                        Id = s.SpeciesId,
                        Name = s.Species.Name,
                        LatinName = s.Species.LatinName,
                        PhotoUrl = s.Species.PhotoUrl,
                        Description = s.Species.Description,
                        EndangeredStatusId = s.Species.EndangeredStatusId
                    },
                PhotoUrl = s.PhotoUrl,
                User = new UserResponse
                    {
                        Id = s.CreatedByUserId,
                        Name = s.CreatedBy.Name,
                        Email = s.CreatedBy.Email,
                        Username = s.CreatedBy.Username
                    }
            };
            return result;
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
            

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                var sighting = _sightingsRepo.Create(newSighting, user.Id);
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

        [HttpPatch]
        [Route("{id}/approve")]
        public ActionResult Approve(
            [FromRoute] int id,
            [FromHeader(Name = "Authorization")] 
            string authHeader)
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
            
            if (user.Role == 0)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to approve a sighting"
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                var appSighting = new ApproveSightingRequest(user);
                var sighting = _sightingsRepo.Approve(id, appSighting);
                return Ok();
            }
            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not approve sighting"
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
            {
                return new UnauthorizedResult();
            }
                
            var sighting = _sightingsRepo.GetById(id);
            
            if (user.Id != sighting.CreatedByUserId && user.Role == 0)
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