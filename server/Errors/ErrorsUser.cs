namespace server.Errors
{
    public static class ErrorsUser
    {
        public static Error UserNotFound
        {
            get => new Error
            {
                ErrorCode = "UserNotFound",
                Description = "Usuario no encontrado"
            };
        }
    }
}
