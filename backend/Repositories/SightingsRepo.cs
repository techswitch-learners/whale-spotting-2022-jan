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

        void Delete(Sighting sighting);

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
    }


}