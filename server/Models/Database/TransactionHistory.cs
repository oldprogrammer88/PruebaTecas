using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models.Database
{
    [Table("TransactionHistory")]
    public class TransactionHistory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public short TransactionTypeId { get; set; }
        public string UserId { get; set; }
        public TransactionType TransactionType { get; set; }
        public User User { get; set; }
    }
}
