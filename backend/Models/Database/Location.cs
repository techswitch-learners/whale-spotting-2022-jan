using System.Collections.Generic;

namespace WhaleSpotting.Models.Database
{

    public class Location
    {
        public int Id { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Amenities { get; set; }

        

    }

}