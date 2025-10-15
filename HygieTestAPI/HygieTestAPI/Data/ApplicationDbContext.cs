using HygieTestAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace HygieTestAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Brasseries> brasseries { get; set; }

        public DbSet<Bieres> bieres { get; set; }

        public DbSet<Grossistes> grossistes { get; set; }
    }
}
