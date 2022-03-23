using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using System.Collections.Generic;

namespace WhaleSpotting.Controllers {
  [ApiController]
  [Route("/locations")]
  public class LocationController : ControllerBase {
    private readonly ILocationsRepo _locations;

    public LocationController(
      ILocationsRepo locations
    ) {
      _locations = locations;
    }

    [HttpGet]
    public ActionResult<List<Location>> GetAllLocations() {
      return _locations.GetAllLocations();
    }   
  }
}
