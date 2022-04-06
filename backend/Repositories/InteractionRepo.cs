using System;
using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Controllers;

namespace WhaleSpotting.Repositories
{ public interface IInteractionRepo
    {
        Interaction Create(InteractionRequest create);
      
    }
    public class InteractionRepo : IInteractionRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public InteractionRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public Interaction Create(InteractionRequest create)
        {
            var insertResult = _context.Interaction.Add(new Interaction
            {
                Date = DateTime.Now,
                WhaleId = create.WhaleId,
                UserId = create.UserId,
            });
            _context.SaveChanges();
            return insertResult.Entity;
        }
    }
}