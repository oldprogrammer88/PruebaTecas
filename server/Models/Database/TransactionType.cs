

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models.Database
{
    public class TransactionType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public short Id { get; set; }
        public string Description { get; set; }
    }
}
