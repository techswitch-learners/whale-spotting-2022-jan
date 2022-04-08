using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Helpers;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Response;
using Microsoft.AspNetCore.Http;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/species")]
    public class SpeciesController : ControllerBase
    {
        private readonly ISpeciesRepo _speciesRepo;
        private readonly IAuthService _authservice;
        private readonly IUsersRepo _usersRepo;
        private readonly IWhalesRepo _whalesRepo;

        public SpeciesController(
            ISpeciesRepo speciesRepo,
            IAuthService authservice,
            IUsersRepo usersRepo,
            IWhalesRepo whalesRepo
            )
        {
            _speciesRepo = speciesRepo;
            _authservice = authservice;
            _usersRepo = usersRepo;
            _whalesRepo = whalesRepo;
        }

        [HttpGet("meetwhales")]
        public ActionResult<List<ExtendedWhaleResponse>> GetAllWhales()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return _whalesRepo.GetAllWhales()
           .Select(w => new ExtendedWhaleResponse(w))
           .ToList();
        }

        [HttpGet("")]
        public ActionResult<List<Species>> SpeciesList()
        {
            return _speciesRepo.GetAllSpecies();
        }
                
        [HttpPost]
        [Route("create")]
        public ActionResult Create([FromBody] CreateSpeciesRequest newSpecies, [FromHeader(Name = "Authorization")] string authHeader)
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
            
            if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to add a species"
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                var species = _speciesRepo.Create(newSpecies, user.Id);
                return Created("/", newSpecies);
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
        [Route("{id}/update")]
        public ActionResult<UpdatedSpeciesResponse> Update(
            [FromRoute] int id,
            [FromHeader(Name = "Authorization")] 
            string authHeader,
            [FromBody] CreateSpeciesRequest updatedSpecies
        )
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
            
            if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to update a species"
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                var speciesUpdate = _speciesRepo.Update(id, updatedSpecies);
                return new UpdatedSpeciesResponse(speciesUpdate);
            }
            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not update species"
                );
            }
        }
        [HttpGet("{speciesId}")]
        public ActionResult<UpdatedSpeciesResponse> GetSpeciesById(
            [FromRoute]int speciesId) 
        {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }
        var species = _speciesRepo.GetSpeciesById(speciesId);
        
        return new UpdatedSpeciesResponse(species);
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
            
             if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to delete a species..."
                );
            }
                
            var species = _speciesRepo.GetSpeciesById(id);
        
            _speciesRepo.Delete(id);
            return Ok();
        } 
    }
}