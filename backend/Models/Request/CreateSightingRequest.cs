using System.ComponentModel.DataAnnotations;
using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class CreateSightingRequest
    {

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(70)]
        public string LocationName { get; set; }

        [Required]
        public Species Species { get; set; }

        [Required]
        [StringLength(400)]
        public string Description {get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        [Required]
        public int UserId { get; set; }
      
    }
}