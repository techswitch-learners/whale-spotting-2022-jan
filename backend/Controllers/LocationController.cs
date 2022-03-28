using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Response;

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
    public ActionResult<List<ExtendedLocationResponse>> GetAllLocations() {
      if (!ModelState.IsValid) {
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
                  .Select(s => new SightingResponse { 
                    Id = s.Id,
                    Date = s.Date,
                    LocationId = s.LocationId,
                    Description = s.Description,
                    SpeciesId = s.SpeciesId,
                    PhotoUrl = s.PhotoUrl,
                    UserId = s.UserId
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
                  .Select(s => new ReducedSightingResponse { Id = s.Id  })
                  .ToList()
            }).ToList();
    }
  }
}
