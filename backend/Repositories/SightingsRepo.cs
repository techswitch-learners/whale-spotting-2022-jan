using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface ISightingsRepo
    {
        List<Sighting> GetAllSightings();

        Sighting GetMostRecentSighting();

        Sighting Create();

        Sighting GetById(int id);

        
        
        void Delete(Sighting sighting);

    }


}