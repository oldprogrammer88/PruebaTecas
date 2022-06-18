namespace server.Models.Requests
{
    public class AddNewSavingAccountRequest
    {
        public string UserEmail { get; set; }
        public int AccountNumber { get; set; }
        public decimal Balance { get; set; }
    }
}
