namespace server.Errors
{
    public class ErrorsWithdrawal
    {
        public static Error ErrorOverAmount { 
            get
            {
                return new Error
                {
                    Description = "La cantidad a retirar es superior a la cantidad en la cuenta",
                    ErrorCode = "OVER_AMOUNT"
                };
            } 
        }
    }
}
