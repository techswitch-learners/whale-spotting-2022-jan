using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace WhaleSpotting.Repositories
{
    public interface ISpeciesRepo
    {
        public List<Species> GetAllSpecies();
    }

    public class SpeciesRepo : ISpeciesRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SpeciesRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public List<Species> GetAllSpecies()
        {
            return _context
                .Species
                .ToList();
        }
    }
}
