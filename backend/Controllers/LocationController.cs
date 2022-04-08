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
    [Route("/locations")]
    public class LocationController : ControllerBase
    {

        private readonly IAuthService _authservice;
        private readonly ILocationsRepo _locations;

        private readonly IUsersRepo _users;

        public LocationController(
          ILocationsRepo locations,
          IUsersRepo users,
          IAuthService authservice
        )
        {
            _locations = locations;
            _users = users;
            _authservice = authservice;
        }

        [HttpGet]
        public ActionResult<List<ExtendedLocationResponse>> GetAllLocations()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return _locations.GetAllLocations()
            .Select(l => new ExtendedLocationResponse
            {
                Id = l.Id,
                Name = l.Name,
                Latitude = l.Latitude,
                Longitude = l.Longitude,
                Description = l.Description,
                Sightings = l.Sightings
                        .Select(s => new SightingResponse
                        {
                            Id = s.Id,
                            Date = s.Date,
                            LocationId = s.LocationId,
                            Description = s.Description,
                            SpeciesId = s.SpeciesId,
                            PhotoUrl = s.PhotoUrl,
                            UserId = s.CreatedByUserId
                        })
                        .ToList(),
                Amenities = l.Amenities
            }).ToList();
        }

        [HttpGet("popular")]
        public ActionResult<List<ReducedLocationResponse>> GetPopularLocations()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return _locations.GetPopularLocations()
            .Select(l => new ReducedLocationResponse
            {
                Id = l.Id,
                Name = l.Name,
                Sightings = l.Sightings
                  .Select(s => new ReducedSightingResponse { Id = s.Id })
                  .ToList()
            }).ToList();
        }

        [HttpGet("{locationId}")]
        public ActionResult<ExtendedLocationResponse> GetLocationById([FromRoute] int locationId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var location = _locations.GetLocationById(locationId);

            return new ExtendedLocationResponse(location);
        }

        [HttpPost]
        [Route("create")]
        public ActionResult<CreateLocationRequest> CreateLocation([FromBody] CreateLocationRequest newLocation, [FromHeader(Name = "Authorization")] string authHeader)
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
                user = _users.GetByUsername(username);
            }

            catch (InvalidOperationException)
            {
                return StatusCode(
                    StatusCodes.Status401Unauthorized,
                    "The given username is not valid"
                );
            }

            if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to add a new location."
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try

            {
                var location = _locations.CreateLocation(newLocation, user.Id);
                return Created("/", newLocation);
            }

            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not create location"
                );
            }
        }

        [HttpPatch]
        [Route("{locationId}/update")]
        public ActionResult<UpdateLocationRequest> UpdateLocation(
            [FromBody] CreateLocationRequest updatedLocation,
            [FromRoute] int locationId,
            [FromHeader(Name = "Authorization")] string authHeader)
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
                user = _users.GetByUsername(username);
            }

            catch (InvalidOperationException)
            {
                return StatusCode(
                    StatusCodes.Status401Unauthorized,
                    "The given username is not valid"
                );
            }

            if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to edit a location."
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                var locationUpdate = _locations.UpdateLocation(updatedLocation, locationId);
                return new UpdateLocationRequest(locationUpdate);

            }
            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not update location"
                );
            }
        }

        [HttpDelete]
        [Route("{locationId}/delete")]
        public IActionResult Delete([FromRoute] int locationId, [FromHeader(Name = "Authorization")] string authHeader)
        {
            if (authHeader is null)
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

            if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to delete a location"
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                _locations.Delete(locationId);
                return Ok();

            }
            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not delete location"
                );
            }
        }



    }
}
