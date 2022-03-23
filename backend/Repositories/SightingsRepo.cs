using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Repositories
{
    public interface ISightingsRepo
    {
        List<Sighting> GetAllSightings();

        Sighting GetMostRecentSighting();

        Sighting Create(CreateSightingRequest newSighting);

        Sighting GetById(int id);

        void Delete(int id);

    }

    public class SightingsRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SightingsRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public List<Sighting> GetAllSigthings()
        {
            return _context.Sightings.ToList();
        }
        public Sighting GetMostRecentSighting()
        {
            return _context.Sightings.OrderBy(x => x.Date).First();
        }
        public Sighting Create(CreateSightingRequest newSighting)
        {
            var insertedResult = _context.Sightings.Add( new Sighting
            {
                Date = newSighting.Date,
                Location = new Location
                    {
                        Name = newSighting.LocationName,
                    },
                Description = newSighting.Description,
                PhotoUrl = newSighting.PhotoUrl,
                UserId = newSighting.UserId,
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