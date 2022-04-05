using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class UpdatedSpeciesResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LatinName { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public int EndangeredStatusId { get; set; }
        public UpdatedSpeciesResponse(Species species)
        {
            Id = species.Id;
            Name = species.Name;
            LatinName = species.LatinName;
            Description = species.Description;
            PhotoUrl = species.PhotoUrl;
            EndangeredStatusId = species.EndangeredStatusId;
        }
        public UpdatedSpeciesResponse()
        {
        }
    }
}