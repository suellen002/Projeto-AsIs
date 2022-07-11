using Microsoft.AspNetCore.Mvc;
using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Controllers
{
    [ApiController]
    [Route("v1/[Controller]")]
    public class FornecedoresController : Controller
    {
        IService<Fornecedor> service;

        public FornecedoresController(FornecedoresService service)
        {
            this.service = service;
        }

        [HttpDelete]
        public async Task<ActionResult<dynamic>> Delete(int id)
        {
            try
            {
                return Ok(await service.Delete(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

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

        [HttpGet("one")]
        public async Task<ActionResult<dynamic>> Get(int id)
        {
            try
            {
                return Ok(await service.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("one")]
        public async Task<ActionResult<dynamic>> Insert([FromBody] Fornecedor entity)
        {
            try
            {
                return Ok(await service.Insert(entity));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<dynamic>> Insert([FromBody] IEnumerable<Fornecedor> entities)
        {
            try
            {
                return Ok(await service.Insert(entities));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<dynamic>> Update([FromBody] Fornecedor entity)
        {
            try
            {
                return Ok(await service.Update(entity));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
