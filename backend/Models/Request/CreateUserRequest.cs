using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request
{
    public class CreateUserRequest
    {
        [Required]
        [StringLength(70)]
        public string Name { get; set; }

        [Required]
        [StringLength(70)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(70)]
        public string Password { get; set; }
    }
}