using WhaleSpotting.Models.Database;
using System.Collections.Generic;

namespace WhaleSpotting.Models.Request
{
    public class UpdateLocationRequest
    {

        public float Latitude { get; set; }

        public float Longitude { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<Sighting> Sightings { get; set; }

        public List<string> Amenities { get; set; }
    }
}