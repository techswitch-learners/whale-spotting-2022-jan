using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WhaleSpotting.Models.Database
{
    public class Species
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LatinName { get; set; }

        public string PhotoUrl { get; set; }

        public string Description { get; set; }

        public string EndangeredStatus { get; set; }
    }
}
