using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;


namespace WhaleSpotting.Repositories
{
    public interface ILocationsRepo
    {
       List < Locations> GetAllLocations();
    }
    
    public class LocationsRepo : ILocationsRepo
    {
        private WhaleSpottingDbContext context = new WhaleSpottingDbContext();
        private readonly WhaleSpottingDbContext _context;

        public LocationsRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public List<Locations> GetAllLocations()
        {
            return context
                .Locations
                .ToList();
        }
    }


}