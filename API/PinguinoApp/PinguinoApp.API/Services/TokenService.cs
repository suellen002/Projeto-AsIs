using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Tudu.API.Products.Services
{
    public class TokenService : ITokenService
    {

        protected readonly IConfiguration configuration;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public dynamic GenerateToken(User user)
        {
            var appSettingsSection = configuration.GetSection(nameof(TokenSettings));
            var tokenSettings = appSettingsSection.Get<TokenSettings>();

            var securityKey = Encoding.UTF8.GetBytes(tokenSettings.SecurityKey);

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Name.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),

                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha384Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            user.Password = "******";

            return new
            {
                user = user,
                token = tokenHandler.WriteToken(token),
                expiration = tokenDescriptor.Expires
            };
        }
    }
}
