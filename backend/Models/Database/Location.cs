using System.Collections.Generic;

namespace WhaleSpotting.Models.Database
{
    public class Location
    {
        public int Id { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Sighting> Sightings { get; set; }
        public List<string> Amenities { get; set; }
    }
}