using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface IEndangeredRepo
    {
        List<EndangeredStatus> GetAllStatuses();
    }

    public class EndangeredRepo : IEndangeredRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public EndangeredRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public List<EndangeredStatus> GetAllStatuses()
        {
            return _context
                .EndangeredStatuses
                .ToList();
        }
    }
}