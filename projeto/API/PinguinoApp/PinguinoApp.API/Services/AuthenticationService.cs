using Microsoft.AspNetCore.Mvc;
using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class AuthenticationService : ControllerBase
    {
        ITokenService tokenService;

        public AuthenticationService(ITokenService tokenService)
        {
            this.tokenService = tokenService;
        }

        public async Task<ActionResult<dynamic>> Login(Login login)
        {
            try
            {
                User user = UsersRepository.GetUser(login.UserName);

                if (user == null)
                    return NotFound("Usuário ou Senha Inválidos");

                if (string.Equals(login.Password, user.Password))
                {
                    return Ok(tokenService.GenerateToken(user));
                }
                else
                {
                    return Unauthorized("Usuário ou Senha Inválidos");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
