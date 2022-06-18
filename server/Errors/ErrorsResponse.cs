namespace server.Errors
{
    public class ErrorsResponse
    {
        public ErrorsResponse(params Error[] errors)
        {
            Errors.AddRange(errors);
        }
        public List<Error> Errors { get; } = new List<Error>();
    }
}
