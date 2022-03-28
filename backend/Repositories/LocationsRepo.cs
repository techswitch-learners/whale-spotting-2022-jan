using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Response;

namespace WhaleSpotting.Repositories
{
    public interface ILocationsRepo
    {
        List<Location> GetAllLocations();
        List<Location> GetPopularLocations();
        Location GetLocationById(int locationId);   
        }
    public class LocationsRepo : ILocationsRepo
    {
        private WhaleSpottingDbContext context = new WhaleSpottingDbContext();
        private readonly WhaleSpottingDbContext _context;
        public LocationsRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public List<Location> GetAllLocations()
        {
            return context
                .Locations
                .Include(l => l.Sightings)
                .ToList();
        }
        public List<Location> GetPopularLocations()
        {
            return context
                .Locations
                .Include(l => l.Sightings)
                .OrderByDescending(l => l.Sightings.Count)
                .Take(2)
                .ToList();
        }
        public Location GetLocationById(int locationId)
        {
            return context
                .Locations
                .Single(location => location.Id == locationId);
        }
    }
}