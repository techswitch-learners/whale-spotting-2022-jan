using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class InteractionRequest
    {
        [Required]
        public int WhaleId { get; set; }
    }
}