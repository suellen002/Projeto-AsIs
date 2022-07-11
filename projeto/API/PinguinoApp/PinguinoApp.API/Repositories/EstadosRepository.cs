using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class EstadosRepository : IRepository<Estado>
    {
        IDapperService service;

        public EstadosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.estados SET ativo = '0' WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @id = id });
            return true;
        }

        public async Task<IEnumerable<Estado>> Get()
        {
            IEnumerable<Estado> estados = new List<Estado>();

            string command =
                @"SELECT e.id, e.descricao, e.sigla, e.ativo, p.id, p.descricao, p.codigo_area as CodigoArea, p.ativo
                    FROM public.estados e
	                    INNER JOIN public.paises p on e.pais = p.id
                    WHERE e.ativo = true
                    ORDER BY p.descricao, e.id;";

            using (var reader = await service.MultiAsync(command))
            {
                estados = reader.Read<Estado, Pais, Estado>((estado, pais) => { estado.Pais = pais; return estado; });
            }

            return estados;
        }

        public async Task<Estado> Get(int id)
        {
            IEnumerable<Estado> estados = new List<Estado>();

            string command =
                @"SELECT e.id, e.descricao, e.sigla, e.ativo, p.id, p.descricao, p.codigo_area as CodigoArea, p.ativo
                    FROM public.estados e
	                    INNER JOIN public.paises p on e.pais = p.id
                    WHERE e.ativo = true and e.id = @id;";

            using (var reader = await service.MultiAsync(command, args: new { @id = id }))
            {
                estados = reader.Read<Estado, Pais, Estado>((estado, pais) => { estado.Pais = pais; return estado; });
            }

            return estados.FirstOrDefault();

        }

        public async Task<bool> Insert(Estado entity)
        {
            string command = @"INSERT INTO estados ( pais, descricao, sigla ) VALUES ( @pais, @descricao, @sigla );";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @pais = entity.Pais.Id, @sigla = entity.Sigla });
            return true;
        }

        public async Task<bool> Insert(IEnumerable<Estado> entities)
        {
            string command = @"INSERT INTO estados ( pais, descricao, sigla ) VALUES ( @pais, @descricao, @sigla );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @pais = entity.Pais.Id, @sigla = entity.Sigla });
            }

            return true;
        }

        public async Task<bool> Update(Estado entity)
        {
            string command = @"UPDATE public.estados SET pais = @pais, descricao = @descricao, sigla = @sigla WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @pais = entity.Pais.Id, @sigla = entity.Sigla, @id = entity.Id });
            return true;
        }
    }
}
