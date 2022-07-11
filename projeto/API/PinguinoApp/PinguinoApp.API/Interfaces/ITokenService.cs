using PinguinoApp.API.Models;

namespace PinguinoApp.API.Interfaces
{
    public interface ITokenService
    {
        dynamic GenerateToken(User user);
    }
}
