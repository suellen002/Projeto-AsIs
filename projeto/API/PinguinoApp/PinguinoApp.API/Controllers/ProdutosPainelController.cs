using Microsoft.AspNetCore.Mvc;
using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Services;
using System;
using System.Threading.Tasks;
namespace PinguinoApp.API.Controllers
{
    [ApiController]
    [Route("v1/[Controller]")]
    public class ProdutosPainelController : Controller
    {
        IService<Produto> service;

        public ProdutosPainelController(ProdutosService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<dynamic>> Get()
        {
            try
            {
                return Ok(await service.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
