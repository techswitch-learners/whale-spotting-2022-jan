using System.Collections.Generic;
namespace WhaleSpotting.Models.Database
{
    public class Whale
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string PhotoUrl { get; set; }
        public Species Species { get ; set; }

        public string Description { get; set; }

        public ICollection<Interaction> Interactions { get; set; } = new List<Interaction>();

    }
}
