using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models.Database;

namespace server.Data
{
    public class DatabaseContext : IdentityDbContext<User>
    {
        public DbSet<SavingAccount> SavingAccount { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<TransactionHistory> TransactionHistory { get; set; }
        public DbSet<TransactionType> TransactionType { get; set; }
        public string DbPath { get; }
        public DatabaseContext(DbContextOptions options) : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "creemosenti.db");
            Console.WriteLine("DbPath " + DbPath);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={DbPath}");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            Modeling.DefineRelationships(builder);

            base.OnModelCreating(builder);
        }
    }
}