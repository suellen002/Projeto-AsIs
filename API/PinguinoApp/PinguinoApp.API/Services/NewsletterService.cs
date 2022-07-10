using Microsoft.AspNetCore.Mvc;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class NewsletterService
    {
        NewsletterRepository repository;

        public NewsletterService(NewsletterRepository newsletterRepository)
        {
            this.repository = newsletterRepository;
        }
        public async Task<ActionResult<dynamic>> Subscription(Newsletter newsletter)
        {
            return await repository.Subscription(newsletter);
        }
        public async Task<ActionResult<dynamic>> Unsubscription(Newsletter newsletter)
        {
            return await repository.Unsubscription(newsletter);
        }

        public Task<ActionResult<dynamic>> ListAll(Newsletter newsletter)
        {
            return null; // await repository. (newsletter);
        }
    }
}
