using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models.Database
{
    [Table("SavingAccount")]
    [Index(nameof(AccountNumber), IsUnique = true)]
    public class SavingAccount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public ulong AccountNumber { get; set; }
        [Required]
        public decimal Balance { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
