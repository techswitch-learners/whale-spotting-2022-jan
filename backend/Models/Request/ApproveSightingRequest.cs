using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class ApproveSightingRequest
    {
        public User ApprovedBy { get; set; }

        public ApproveSightingRequest (User approvedBy)
        {
            ApprovedBy = approvedBy;
        }
    }
}