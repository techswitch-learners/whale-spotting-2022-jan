using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace WhaleSpotting.Helpers
{
    public static class AuthHelper
    {
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static string GetUsernamePassword(string authHeader)
        {
            var encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
            return AuthHelper.Base64Decode(encodedUsernamePassword);
        }   
    }
}
