namespace WhaleSpotting.Models.Database
{
    public class Whale
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string PhotoUrl { get; set; }
        public Species Species { get ; set; }
    }
}
