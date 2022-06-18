namespace server.Models.Responses
{
    public class PageTransactionHistoryResponse
    {
        public IEnumerable<TransactionHistoryResponse> Transactions { get; set; }
        public int Size { get; set; }
        public int Page { get; set; }
        public long TotalPages { get; set; }

        public class TransactionHistoryResponse
        {
            public string TypeTransaction { get; set; }
            public decimal Amount { get; set; }
            public DateTime Date { get; set; }
        }
    }
}
