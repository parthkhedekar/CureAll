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
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; } // Add DbSet for Patients


        

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