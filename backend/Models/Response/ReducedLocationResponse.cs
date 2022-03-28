
using System.Collections.Generic;

namespace WhaleSpotting.Models.Response {

    public class ReducedLocationResponse {
        
        public int Id { get; set; }

        public string Name { get; set; }
        public List<ReducedSightingResponse> Sightings { get; set; }

    }
}