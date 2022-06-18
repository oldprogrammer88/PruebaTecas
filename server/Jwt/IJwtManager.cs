using server.Models.Database;

namespace server.Jwt
{
    public interface IJwtManager
    {
        string CreateToken(User user);
    }
}
