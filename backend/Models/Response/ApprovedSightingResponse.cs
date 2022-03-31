using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response
{
    public class ApprovedSightingResponse
    {
        public User ApprovedBy { get; set; }
    }
}