namespace server.Models.Requests
{
    public class DepositAccountRequest
    {
        public ulong AccountNumber { get; set; }
        public decimal Amount { get; set; }
    }
}
