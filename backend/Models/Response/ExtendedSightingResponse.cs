using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response
{
    public class ExtendedSightingResponse
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Location Location { get; set; }
        public string Description { get; set; }
        public Species Species { get; set; }
        public string PhotoUrl { get; set; }
        public UserResponse User { get; set; }
        public ExtendedSightingResponse(Sighting sighting)
        {
            Id = sighting.Id;
            Date = sighting.Date;
            Location = sighting.Location;
            Description = sighting.Description;
            Species = sighting.Species;
            PhotoUrl = sighting.PhotoUrl;
            User = new UserResponse
            {
                Id = sighting.Id,
                Name = sighting.User.Name,
                Username = sighting.User.Username,
                Email = sighting.User.Email
            };
        }
        public ExtendedSightingResponse()
        {
            
        }
    }
}