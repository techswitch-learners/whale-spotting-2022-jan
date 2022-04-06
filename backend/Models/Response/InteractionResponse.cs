using System;
using System.Text.Json.Serialization;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response
{
    public class InteractionResponse
    {
        private readonly Interaction _interaction;

        public InteractionResponse(Interaction interaction)
        {
            _interaction = interaction;
        }

        public int Id => _interaction.Id;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DateTime Date => _interaction.Date;
        public int WhaleId => _interaction.WhaleId;
        public int UserId => _interaction.UserId;
    }
}