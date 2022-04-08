namespace WhaleSpotting.Models.Response {
    public class UserRoleResponse {
        
        public int RoleInt { get; set; }
        public string RoleType { get; set; }

        public UserRoleResponse(int roleInt, string roleType)
        {
            RoleInt = roleInt;
            RoleType = roleType;
        }
    }
}