using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request {
  public class LoginUserRequest {
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password {
      get; set;
    }
  }
}
