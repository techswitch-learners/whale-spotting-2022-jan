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
        public ActionResult<List<Whale>> WhaleList()
        {
            return _whalesRepo.GetAllWhales();
        }


    }
}

