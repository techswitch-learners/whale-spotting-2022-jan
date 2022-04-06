using System;
using WhaleSpotting.Models.Database;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Response;

namespace WhaleSpotting.Models.Response
{
    public class ExtendedWhaleResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Species Species { get; set; }
        public string PhotoUrl { get; set; }
        public List<UserResponse> Users { get; set; }
        public ExtendedWhaleResponse(Whale whale)
        {
            Id = whale.Id;
            Name = whale.Name;
            Description = whale.Description;
            Species = whale.Species;
            PhotoUrl = whale.PhotoUrl;
            Users = whale.Interactions.Select(i => new UserResponse(){
                Name = i.User.Name,
                Username = i.User.Username
            }).ToList();
           
        }
        public ExtendedWhaleResponse()
        {
            
        }
    }
}