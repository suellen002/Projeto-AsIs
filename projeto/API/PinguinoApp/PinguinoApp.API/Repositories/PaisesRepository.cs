using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class PaisesRepository : IRepository<Pais>
    {
        IDapperService service;

        public PaisesRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.paises SET ativo = '0' WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @id = id });
            return true;
        }

        public async Task<IEnumerable<Pais>> Get()
        {
            string command = @"SELECT id, descricao, codigo_area as CodigoArea, ativo FROM public.paises WHERE ativo = true ORDER BY id;";
            return await service.ListAsync<Pais>(command);
        }

        public async Task<Pais> Get(int id)
        {
            string command = @"SELECT id, descricao, codigo_area as CodigoArea, ativo FROM public.paises WHERE id = @id;";
            return await service.SingleAsync<Pais>(command, parameters: new { @id = id });
        }

        public async Task<bool> Insert(Pais entity)
        {
            string command = @"INSERT INTO paises ( descricao, codigo_area ) VALUES ( @descricao, @codigo_area );";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @codigo_area = entity.CodigoArea });
            return true;
        }

        public async Task<bool> Insert(IEnumerable<Pais> entities)
        {
            string command = @"INSERT INTO paises ( descricao, codigo_area ) VALUES ( @descricao, @codigo_area );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @codigo_area = entity.CodigoArea });
            }

            return true;
        }

        public async Task<bool> Update(Pais entity)
        {
            string command = @"UPDATE public.paises SET descricao = @descricao, codigo_area = @codigo_area WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @codigo_area = entity.CodigoArea, @id = entity.Id });
            return true;
        }
    }
}
