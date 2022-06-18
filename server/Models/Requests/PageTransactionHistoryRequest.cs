namespace server.Models.Requests
{
    public class PageTransactionHistoryRequest
    {
        public string Email { get; set; }
        public int Page { get; set; }
        public int Size { get; set; }
    }
}
