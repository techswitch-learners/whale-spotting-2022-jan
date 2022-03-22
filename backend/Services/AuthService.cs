using System;
using System.Linq;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace WhaleSpotting.Services
{
    public interface IAuthService
    {
        bool IsAuthenticated(string usernamePassword);
    }
    public class AuthService : IAuthService
    {
        private readonly WhaleSpottingDbContext _context;
        public AuthService(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public bool IsAuthenticated(string usernamePassword)
        {
            int separatorIndex = usernamePassword.IndexOf(':');

            var splitUsernamePassword = usernamePassword.Split(':');
            var username = splitUsernamePassword[0];
            var password = splitUsernamePassword[1];

            var foundUser = _context.Users.Single(user => user.Username == username);

            if (foundUser != null)
            {
                var foundUserSalt = foundUser.Salt;

                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: password,
                    salt: foundUserSalt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));

                return hashed == foundUser.HashedPassword;
            }
            else
                return false;
        }
    }
};
