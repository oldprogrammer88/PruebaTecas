namespace server.Models.Requests
{
    public class UserRegisterRequest
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string? SecondLastName { get; set; }
        public int IdentificationNumber { get; set; }
        public string Password { get; set; }
    }
}
