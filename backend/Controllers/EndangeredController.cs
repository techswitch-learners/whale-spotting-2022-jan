using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Repositories;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/endangered")]
    public class EndangeredController : ControllerBase
    {
        private readonly IEndangeredRepo _endangeredRepo;
        public EndangeredController(
            IEndangeredRepo endangeredRepo
            )
        {
            _endangeredRepo = endangeredRepo;
        }

        [HttpGet]
        public ActionResult<List<EndangeredStatus>> GetAllStatuses()
        {
            return _endangeredRepo.GetAllStatuses();
        }
    }
}