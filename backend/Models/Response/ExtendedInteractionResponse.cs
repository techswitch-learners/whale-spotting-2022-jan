
using System;
using WhaleSpotting.Models.Database;
using System.Linq;

namespace WhaleSpotting.Models.Response {

    public class ExtendedInteractionResponse {
        
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WhaleId { get; set; }
        public User User { get; set; }
        public Whale Whale { get; set; }
        public DateTime Date { get; set; }

        public ExtendedInteractionResponse(Interaction interaction)
        {
            Id = interaction.Id;
            UserId = interaction.UserId;
            WhaleId = interaction.WhaleId;
            Date = interaction.Date;
            Whale=interaction.Whale;
            User=interaction.User;
        }
        public ExtendedInteractionResponse()
        {
            
        }
    }
}