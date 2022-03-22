using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request
{
    public class CreateSightingRequest
    {

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        [Required]
        [StringLength(70)]
        public string LocationName { get; set; }

        [Required]
        public string Species { get; set; }

        [Required]
        [StringLength(400)]
        public string Description {get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        [Required]
        public string Username { get; set; }
      
    }
}