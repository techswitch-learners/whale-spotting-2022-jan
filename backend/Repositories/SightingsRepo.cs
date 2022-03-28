using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories
{
    public interface ISightingsRepo
    {
        List<Sighting> GetAllSightings();

        Sighting GetMostRecentSighting();

        Sighting Create(CreateSightingRequest newSighting, int userId);

        Sighting GetById(int id);

        void Delete(int id);

    }
    public class SightingsRepo : ISightingsRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SightingsRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public List<Sighting> GetAllSightings()
        {
            return _context
                .Sightings
                .Include(l => l.Location)
                .Include(s => s.Species)
                .Include(u => u.User)
                .ToList();
        }

        public Sighting GetMostRecentSighting()
        {
            return _context.Sightings.OrderBy(x => x.Date).First();
        }
        public Sighting Create(CreateSightingRequest newSighting, int userId)
        {
            var insertedResult = _context.Sightings.Add( new Sighting
            {
                Date = newSighting.Date,
                LocationId = newSighting.LocationId,
                Description = newSighting.Description,
                PhotoUrl = newSighting.PhotoUrl,
                UserId = userId,
                SpeciesId = newSighting.SpeciesId,

            });
            _context.SaveChanges();
            return insertedResult.Entity;
        }
        public Sighting GetById(int id)
        {
            return _context.Sightings
            .Single(sighting => sighting.Id == id);
        }
        public void Delete(int id)
        {
            var sighting = GetById(id);
            _context.Sightings.Remove(sighting);
            _context.SaveChanges();
        }
    }
}
