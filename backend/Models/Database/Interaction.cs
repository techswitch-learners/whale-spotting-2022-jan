using System;

namespace WhaleSpotting.Models.Database
{
    public class Interaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WhaleId { get; set; }
        public User User { get; set; }
        public Whale Whale { get; set; }
        public DateTime Date { get; set; }
    }
}