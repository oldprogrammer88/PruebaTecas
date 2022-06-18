namespace server.Models.Requests
{
    public class WithdrawalAccountRequest
    {
        public ulong AccountNumber { get; set; }
        public decimal Amount { get; set; }
    }
}
