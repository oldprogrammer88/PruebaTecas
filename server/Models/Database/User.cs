using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models.Database
{
    [Index(nameof(IdentificationNumber), IsUnique = true)]
    public class User : IdentityUser
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? SecondLastName { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int IdentificationNumber { get; set; }
        public List<SavingAccount> SavingAccounts { get; set; }
    }
}
