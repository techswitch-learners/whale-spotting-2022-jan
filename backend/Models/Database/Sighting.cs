namespace WhaleSpotting.Models.Database
{
    public class Sighting
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Species Species { get; set; }
    }
    public enum Species
    {
        BlueWhale,
        HumpbackWhale,
        Orca

    }
}