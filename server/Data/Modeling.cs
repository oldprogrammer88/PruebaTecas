using Microsoft.EntityFrameworkCore;
using server.Models.Database;

namespace server.Data
{
    public class Modeling
    {
        public static void DefineRelationships(ModelBuilder builder)
        {
            builder.Entity<SavingAccount>()
                .HasOne(s => s.User)
                .WithMany(s => s.SavingAccounts)
                .HasForeignKey(s => s.UserId)
                .IsRequired();

            builder.Entity<TransactionHistory>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId)
                .IsRequired();

            builder.Entity<TransactionHistory>()
                .HasOne(t => t.TransactionType)
                .WithMany()
                .HasForeignKey(t => t.TransactionTypeId)
                .IsRequired();

            builder.Entity<TransactionHistory>()
                .HasOne(t => t.SavingAccount)
                .WithMany()
                .HasForeignKey(t => t.SavingAccountId)
                .IsRequired();
        }
    }
}
