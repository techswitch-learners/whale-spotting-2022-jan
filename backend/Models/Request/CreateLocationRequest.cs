using System.ComponentModel.DataAnnotations;
using System;
using WhaleSpotting.Models.Database;
using System.Collections.Generic;

namespace WhaleSpotting.Models.Request
{
    public class CreateLocationRequest
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public float Latitude { get; set; }

        [Required]
        public float Longitude { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        
        public List<Sighting> Sightings { get; set; }

        [Required]
        public List<string> Amenities { get; set; }

    }
    
}