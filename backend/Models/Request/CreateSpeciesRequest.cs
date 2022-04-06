using System.ComponentModel.DataAnnotations;
using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class CreateSpeciesRequest
    {
        [Required]
        public string Name{ get; set; }
        public string LatinName { get; set; }

        [Required]
        [StringLength(2048)]
        public string Description {get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        [Required]
        public int EndangeredStatusId { get; set; }
        public CreateSpeciesRequest (Species species)
        {
            Name = species.Name;
            LatinName = species.LatinName;
            Description = species.Description;
            PhotoUrl = species.PhotoUrl;
            EndangeredStatusId = species.EndangeredStatusId;
        }
        public CreateSpeciesRequest ()
        {
        }
    }
}