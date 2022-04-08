using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Models.Response;

namespace WhaleSpotting.Repositories
{
    public interface IUsersRepo
    {
        User Create(CreateUserRequest newUser);

        User GetById(int id);

        List<User> GetAllUsers();
        User GetByUsername(string username);
        User UpdateRole(UpdateUserRoleRequest update);
        List<LeaderboardEntry> GetLeaderboard();
        List<UserRoleResponse> GetUserRoles();
    }

    public class UsersRepo : IUsersRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public UsersRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public User Create(CreateUserRequest newUser)
        {
            // generate a 128-bit salt using a cryptographically strong random sequence of nonzero values
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: newUser.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8
            ));

            var insertResponse = _context.Users.Add(new User
            {
                Name = newUser.Name,
                HashedPassword = hashed,
                Salt = salt,
                Username = newUser.Username,
                Email=newUser.Email,
                Role = UserType.MEMBER
            });

            _context.SaveChanges();

            return insertResponse.Entity;
        }

        public User GetById(int id)
        {
            return _context.Users
                .Single(user => user.Id == id);
        }

        public User GetByUsername(string username)
        {
            return _context.Users
                .Single(user => user.Username == username);
        }

        public User UpdateRole(UpdateUserRoleRequest update)
        {
            var user = GetById(update.UserId);

            user.Role = update.Role;

            _context.Users.Update(user);
            _context.SaveChanges();

            return user;
        }

         public List<User> GetAllUsers()
        {
            return _context
                .Users
                .ToList();
        }
        public List<LeaderboardEntry> GetLeaderboard()
        {
            return _context.Sightings
                .GroupBy(sighting => sighting.CreatedByUserId)
                .Select(sighting => new {count = sighting.Count(), userId = sighting.Key})
                .OrderByDescending(g => g.count)
                .Join(
                    _context.Users, 
                    sighting => sighting.userId, 
                    user => user.Id, 
                    (sighting, user) => new LeaderboardEntry { 
                        Username = user.Username, 
                        Count = sighting.count 
                    }
                ).ToList();
        }
        public List<UserRoleResponse> GetUserRoles()
        {
            /* var roleIntValues = Enum.GetValues(typeof(UserType)).Cast<UserType>().ToList();

            foreach (var i in Enum.GetValues(typeof(UserType)))
            {
                String name = i.ToString();
                var number = i.Cast<UserType>();
                UserRoleResponse thing = new UserRoleResponse
                {
                    RoleInt = i,
                    RoleType = name,
                };
            }

            foreach (var enumValue in Enum.GetValues(typeof(UserType)))
            {
                UserRoleResponse thing = new UserRoleResponse
                {
                    RoleInt = (int)Enum.ToObject(enumValue.GetType(), enumValue),
                    RoleType = enumValue.ToString(),
                };
            } */

            return new List<UserRoleResponse>();
        }
    }
}
