using MultiHospital.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MultiHospital.Context
{
    public class IdentityDatabaseContext : IdentityDbContext
    {
        public IdentityDatabaseContext(DbContextOptions<IdentityDatabaseContext> dbOptions) : base(dbOptions)
        {

        }
      
        public DbSet<Hospital> Hospitals { get; set; }
      

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Hospital - Department Relationship ✅ (Cascade Allowed)
            modelBuilder.Entity<Hospital>()
                .HasMany(h => h.Departments)
                .WithOne(d => d.Hospital)
                .HasForeignKey(d => d.HospitalID)
                .OnDelete(DeleteBehavior.Cascade);

            
       
        }





    }
}