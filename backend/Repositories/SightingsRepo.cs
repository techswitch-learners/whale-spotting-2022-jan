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

        Sighting Create(CreateSightingRequest newSighting);

        Sighting GetById(int id);
        Sighting Approve(int sightingId, ApproveSightingRequest appSighting);

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
                .Include(u => u.CreatedBy)
                .Include(a => a.ApprovedBy)
                .ToList();
        }

        public Sighting GetMostRecentSighting()
        {
            return _context
                .Sightings
                .Include(l => l.Location)
                .Include(s => s.Species)
                .Include(u => u.CreatedBy)
                .OrderByDescending(x => x.Date).First();
        }
        public Sighting Create(CreateSightingRequest newSighting)
        {
            var insertedResult = _context.Sightings.Add( new Sighting
            {
                Date = newSighting.Date,
                LocationId = newSighting.LocationId,
                Description = newSighting.Description,
                PhotoUrl = newSighting.PhotoUrl,
                CreatedByUserId = newSighting.UserId,
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
        public Sighting Approve(
            int sightingId, 
            ApproveSightingRequest appSighting
            )
        {
            var sightingToApprove = GetById(sightingId);
            sightingToApprove.ApprovedBy = appSighting.ApprovedBy;
            _context.Sightings.Update(sightingToApprove);
            _context.SaveChanges();

            return sightingToApprove;
        }
        public void Delete(int id)
        {
            var sighting = GetById(id);
            _context.Sightings.Remove(sighting);
            _context.SaveChanges();
        }
    }
}