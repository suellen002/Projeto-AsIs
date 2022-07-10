using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class NewsletterRepository
    {
        IDapperService service;

        public NewsletterRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<int> Subscription(Newsletter newsletter)
        {
            string sql = @"INSERT INTO Newsletter ( email, nome  )VALUES( @email, @nome );";
            return await service.ScalarAsync<int>(sql, parameters: new { @email = newsletter.Email, @nome = newsletter.Nome });
        }

        public async Task<bool> Unsubscription(Newsletter newsletter)
        {
            string sql = @"DELETE FROM Newsletter WHERE email = @email AND nome = @nome );";
            return await service.ScalarAsync<bool>(sql, parameters: new { @email = newsletter.Email, @nome = newsletter.Nome });
        }

        public async Task<IEnumerable<Newsletter>> Get()
        {
            string sql = @"SELECT email, nome FROM public.newsletter;";
            return await service.ListAsync<Newsletter>(sql);
        }
    }
}
