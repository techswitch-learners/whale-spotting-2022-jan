using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Helpers;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Response;
using System.Linq;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/species")]
    public class SpeciesController : ControllerBase
    {
        private readonly ISpeciesRepo _speciesRepo;
        private readonly IWhalesRepo _whalesRepo;

        public SpeciesController(
            ISpeciesRepo speciesRepo,
            IWhalesRepo whalesRepo
        )
        {
            _speciesRepo = speciesRepo;
            _whalesRepo = whalesRepo;
        }

        [HttpGet("")]
        public ActionResult<List<Species>> SpeciesList()
        {
            return _speciesRepo.GetAllSpecies();
        }

        [HttpGet("meetwhales")]
        // public ActionResult<List<Whale>> WhaleList()
        // {
        //     return _whalesRepo.GetAllWhales();
        // }

        public ActionResult<List<ExtendedWhaleResponse>> GetAllWhales()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return _whalesRepo.GetAllWhales()
            .Select(w => new ExtendedWhaleResponse
            {
                Id = w.Id,
                Name = w.Name,
                Description = w.Description,
                Species = w.Species,
                PhotoUrl = w.PhotoUrl,
                Users = w.User
                        .Select(u => new UserResponse
                        {
                            Id = u.Id,
                            Name = u.Name,
                            Username = u.Username,
                            Email = u.Email,
                        })
                        .ToList(),
            }).ToList();
        }

    }
}

