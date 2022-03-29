
using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using System.Linq;

namespace WhaleSpotting.Models.Response {

    public class ExtendedLocationResponse {
        
        public int Id { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<SightingResponse> Sightings { get; set; }
        public List<string> Amenities { get; set; }

        public ExtendedLocationResponse(Location location)
        {
            Id = location.Id;
            Latitude = location.Latitude;
            Longitude = location.Longitude;
            Name = location.Name;
            Description = location.Description;
            Sightings = location.Sightings.Select(l => new SightingResponse(l)).ToList();
            Amenities = location.Amenities;
        }
        public ExtendedLocationResponse()
        {
            
        }
    }
}