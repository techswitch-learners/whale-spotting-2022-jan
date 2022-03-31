using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpotting.Models.Database
{
    public class Sighting
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Location Location { get; set; }
        public int LocationId { get; set; }
        public string Description { get; set; }
        public Species Species { get; set; }
        public int SpeciesId { get; set; }
        public string PhotoUrl { get; set; }
        [ForeignKey("CreatedBy")]
        public int CreatedByUserId { get; set; }
        public User CreatedBy { get; set; }
        [ForeignKey("ApprovedByUserId")]
        public User ApprovedBy { get; set; }
    }
}