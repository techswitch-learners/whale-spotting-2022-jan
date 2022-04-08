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
            Location = new Location
            {
                Id = sighting.LocationId,
                Name = sighting.Location.Name,
                Latitude = sighting.Location.Latitude,
                Longitude = sighting.Location.Longitude,
                Description = sighting.Location.Description,
                Amenities = sighting.Location.Amenities
            };
            Description = sighting.Description;
            Species = new Species
            {
                Id = sighting.SpeciesId,
                Name = sighting.Species.Name,
                LatinName = sighting.Species.LatinName,
                PhotoUrl = sighting.Species.PhotoUrl,
                Description = sighting.Species.Description,
                EndangeredStatus = sighting.Species.EndangeredStatus
            };
            PhotoUrl = sighting.PhotoUrl;
            User = new UserResponse
            {
                Id = sighting.CreatedByUserId,
                Name = sighting.CreatedBy.Name,
                Email = sighting.CreatedBy.Email,
                Username = sighting.CreatedBy.Username
            };
            ApprovedBy = sighting.ApprovedBy != null
            ? new UserResponse
            {
                Id = sighting.ApprovedBy.Id,
                Name = sighting.ApprovedBy.Name,
                Email = sighting.ApprovedBy.Email,
                Username = sighting.ApprovedBy.Username
            } 
            : null;
        }
        public ExtendedSightingResponse()
        {
            
        }
    }
}