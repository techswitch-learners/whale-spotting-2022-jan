using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response
{
    public class SightingResponse
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int LocationId { get; set; }
        public string Description { get; set; }
        public int SpeciesId { get; set; }
        public string PhotoUrl { get; set; }
        public int UserId { get; set; }
        public SightingResponse(Sighting sighting)
        {
            Id = sighting.Id;
            Date = sighting.Date;
            LocationId = sighting.LocationId;
            Description = sighting.Description;
            SpeciesId = sighting.SpeciesId;
            PhotoUrl = sighting.PhotoUrl;
            UserId = sighting.CreatedByUserId;
        }
        public SightingResponse()
        {
            
        }
    }
}