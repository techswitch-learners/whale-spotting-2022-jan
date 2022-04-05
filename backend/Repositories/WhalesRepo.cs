using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories
{
    public interface IWhalesRepo
    {
        public List<Whale> GetAllWhales();
    }

    public class WhalesRepo : IWhalesRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public WhalesRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public List<Whale> GetAllWhales()
        {
            return _context
                .Whales
                .Include(s => s.User)
                .Include(s => s.Species)
                .ToList();
        }
    }
}