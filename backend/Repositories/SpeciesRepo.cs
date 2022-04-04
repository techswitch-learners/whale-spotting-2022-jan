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
    public interface ISpeciesRepo
    {
        List<Species> GetAllSpecies();
        Species Create(CreateSpeciesRequest newSpecies, int userId);
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
                .Include(e => e.EndangeredStatus)
                .ToList();
        }
        public Species Create(CreateSpeciesRequest newSpecies, int userId)
        {
            var insertedResult = _context.Species.Add( 
                new Species
                {
                    Name = newSpecies.Name,
                    LatinName = newSpecies.LatinName,
                    PhotoUrl = newSpecies.PhotoUrl,
                    Description = newSpecies.Description,
                    EndangeredStatusId = newSpecies.EndangeredStatusId
                });
            _context.SaveChanges();
            return insertedResult.Entity;
        }
    }
}
