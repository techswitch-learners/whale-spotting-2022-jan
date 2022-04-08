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
        Location CreateLocation(CreateLocationRequest newLocation, int userId);
        Location UpdateLocation(CreateLocationRequest updatedLocation, int locationId);
        void Delete(int id);
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
                .Include(l => l.Sightings)
                .Single(location => location.Id == locationId);
        }

        public Location CreateLocation(CreateLocationRequest newLocation , int userId)
        {
            var insertedResult = _context.Locations.Add( new Location
            {
                Latitude = newLocation.Latitude,
                Longitude = newLocation.Longitude,
                Name = newLocation.Name,
                Description = newLocation.Description,
                Sightings = newLocation.Sightings,
                Amenities = newLocation.Amenities

            });
            
            _context.SaveChanges();
            return insertedResult.Entity;
        }

        public Location UpdateLocation(CreateLocationRequest updatedLocation, int locationId)
        {
            
        var location = _context.Locations.Where(l => l.Id == locationId).First();

        location.Latitude = updatedLocation.Latitude;
        location.Longitude = updatedLocation.Longitude;
        location.Name = updatedLocation.Name;
        location.Description = updatedLocation.Description;
        location.Sightings = updatedLocation.Sightings;
        location.Amenities = updatedLocation.Amenities;

        _context.Locations.Update(location);
        _context.SaveChanges();
        return location;

        }

        public void Delete(int id)
        {
            var location = GetLocationById(id);
            _context.Locations.Remove(location);
            _context.SaveChanges();
        }
    }
}