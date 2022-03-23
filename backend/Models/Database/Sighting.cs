using System;

namespace WhaleSpotting.Models.Database
{
    public class Sighting
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Location Location { get; set; }
        public string Description { get; set; }
        public Species Species { get; set; }
        public string PhotoUrl { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        

    }
    public enum Species
    {
        BlueWhale,
        HumpbackWhale,
        Orca

    }
}