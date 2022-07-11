using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class MunicipiosRepository : IRepository<Municipio>
    {
        IDapperService service;

        public MunicipiosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.municipios SET ativo = '0' WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @id = id });
            return true;
        }

        public async Task<IEnumerable<Municipio>> Get()
        {
            IEnumerable<Municipio> municipios = new List<Municipio>();

            string command = @"
                SELECT m.id, m.descricao, m.ativo, e.id, e.descricao, e.sigla, e.ativo, p.id, p.descricao, p.codigo_area as CodigoArea, p.ativo
                FROM public.municipios m 
                    INNER JOIN public.estados e ON m.estado = e.id
	                INNER JOIN public.paises p on e.pais = p.id
                WHERE m.ativo = true
                ORDER BY m.id;"
            ;

            using (var reader = await service.MultiAsync(command))
            {
                municipios = reader.Read<Municipio, Estado, Pais, Municipio>((municipio, estado, pais) => { estado.Pais = pais; municipio.Estado = estado; return municipio; });
            }

            return municipios;
        }

        public async Task<Municipio> Get(int id)
        {
            IEnumerable<Municipio> municipios = new List<Municipio>();

            string command = @"
                SELECT m.id, m.descricao, m.ativo, e.id, e.descricao, e.sigla, e.ativo, p.id, p.descricao, p.codigo_area as CodigoArea, p.ativo
                FROM public.municipios m 
                    INNER JOIN public.estados e ON m.estado = e.id
	                INNER JOIN public.paises p on e.pais = p.id
                WHERE m.id = @id;"
            ;

            using (var reader = await service.MultiAsync(command, args: new { @id = id }))
            {
                municipios = reader.Read<Municipio, Estado, Pais, Municipio>((municipio, estado, pais) => { estado.Pais = pais; municipio.Estado = estado; return municipio; });
            }

            return municipios.FirstOrDefault();
        }

        public async Task<bool> Insert(Municipio entity)
        {
            string command = @"INSERT INTO municipios ( estado, descricao, ativo ) VALUES ( @estado, @descricao, @ativo );";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @estado = entity.Estado, @ativo = entity.Ativo });
            return true;
        }

        public async Task<bool> Insert(IEnumerable<Municipio> entities)
        {
            string command = @"INSERT INTO municipios ( estado, descricao, ativo ) VALUES ( @estado, @descricao, @ativo );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @estado = entity.Estado, @ativo = entity.Ativo });
            }

            return true;
        }

        public async Task<bool> Update(Municipio entity)
        {
            string command = @"UPDATE public.municipios SET descricao = @descricao, estado = @estado WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @estado = entity.Estado, @id = entity.Id });
            return true;
        }
    }
}
