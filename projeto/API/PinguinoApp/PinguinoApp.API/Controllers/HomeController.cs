
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PinguinoApp.API.Models;
using PinguinoApp.API.Services;
using System.Threading.Tasks;

namespace PinguinoApp.API.Controllers
{
    [ApiController]
    [Route("v1/account")]
    public class HomeController : ControllerBase
    {
        AuthenticationService authenticationService;

        public HomeController(AuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Login([FromBody] Login login)
        {
            return await authenticationService.Login(login);
        }
    }
}
