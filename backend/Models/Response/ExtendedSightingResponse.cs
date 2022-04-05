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
        public UserResponse ApprovedBy { get; set; }
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
                Id = sighting.CreatedByUserId,
                Name = sighting.CreatedBy.Name,
                Email = sighting.CreatedBy.Email,
                Username = sighting.CreatedBy.Username
            };
            ApprovedBy = new UserResponse{
                Id = sighting.ApprovedBy.Id,
                Name = sighting.ApprovedBy.Name,
                Email = sighting.ApprovedBy.Email,
                Username = sighting.ApprovedBy.Username
            };
        }
        public ExtendedSightingResponse()
        {
            
        }
    }
}