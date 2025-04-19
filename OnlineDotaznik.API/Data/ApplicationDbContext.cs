using Microsoft.EntityFrameworkCore;
using OnlineQuestionnaire.API.Models;

namespace OnlineQuestionnaire.API.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    /// <summary>
    /// DbSet representing all registration records
    /// </summary>
    public DbSet<Registration> Registrations => Set<Registration>();

    /// <summary>
    /// Configure model constraints and indexes
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Registration>()
            .HasIndex(r => r.Email)
            .IsUnique();

        modelBuilder.Entity<Registration>()
            .HasIndex(r => r.BirthNumber)
            .IsUnique()
            .HasFilter("[BirthNumber] IS NOT NULL");
    }
}
