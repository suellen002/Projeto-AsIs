using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class EnderecosRepository : IRepository<Endereco>
    {
        IDapperService service;

        public EnderecosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.enderecos SET ativo = '0' WHERE id = @id;";
            return await service.ScalarAsync<bool>(command, parameters: new { @id = id });
        }

        public async Task<IEnumerable<Endereco>> Get()
        {
            IEnumerable<Endereco> enderecos = new List<Endereco>();

            string command = @"
                SELECT en.id, en.logradouro, en.numero, en.complemento, en.cep, en.ativo, m.id, m.descricao, m.ativo, e.id, e.descricao, e.sigla, e.ativo, p.id, p.descricao, p.codigo_area as CodigoArea, p.ativo
                FROM public.enderecos en
                    INNER JOIN public.municipios m ON en.municipio = m.id
                    INNER JOIN public.estados e ON m.estado = e.id
	                INNER JOIN public.paises p on e.pais = p.id
                WHERE en.ativo = true
                ORDER BY en.id;"
            ;

            using (var reader = await service.MultiAsync(command))
            {
                enderecos = reader.Read<Endereco, Municipio, Estado, Pais, Endereco>((endereco, municipio, estado, pais) => { estado.Pais = pais; municipio.Estado = estado; endereco.Municipio = municipio; return endereco; });
            }

            return enderecos;
        }

        public async Task<Endereco> Get(int id)
        {
            IEnumerable<Endereco> enderecos = new List<Endereco>();

            string command = @"
                SELECT en.id, en.logradouro, en.numero, en.complemento, en.cep, en.ativo, m.id, m.descricao, m.ativo, e.id, e.descricao, e.sigla, e.ativo, p.id, p.descricao, p.codigo_area as CodigoArea, p.ativo
                FROM public.enderecos en
                    INNER JOIN public.municipios m ON en.municipio = m.id
                    INNER JOIN public.estados e ON m.estado = e.id
	                INNER JOIN public.paises p on e.pais = p.id
                WHERE en.id = @id"
            ;

            using (var reader = await service.MultiAsync(command, args: new { @id = id }))
            {
                enderecos = reader.Read<Endereco, Municipio, Estado, Pais, Endereco>((endereco, municipio, estado, pais) => { estado.Pais = pais; municipio.Estado = estado; endereco.Municipio = municipio; return endereco; });
            }

            return enderecos.FirstOrDefault();
        }

        public async Task<bool> Insert(Endereco entity)
        {
            string command = @"INSERT INTO enderecos ( logradouro, numero, complemento, municipio, cep ) VALUES ( @logradouro, @numero, @complemento, @municipio, @cep );";
            return await service.ScalarAsync<bool>(command, parameters: new
            {
                @logradouro = entity.Logradouro,
                @numero = entity.Numero,
                @complemento = entity.Complemento,
                @municipio = entity.Municipio,
                @cep = entity.Cep
            });
        }

        public async Task<bool> Insert(IEnumerable<Endereco> entities)
        {
            string command = @"INSERT INTO enderecos ( logradouro, numero, complemento, municipio, cep ) VALUES ( @logradouro, @numero, @complemento, @municipio, @cep );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new
                {
                    @logradouro = entity.Logradouro,
                    @numero = entity.Numero,
                    @complemento = entity.Complemento,
                    @municipio = entity.Municipio,
                    @cep = entity.Cep
                });
            }

            return true;
        }

        public async Task<bool> Update(Endereco entity)
        {
            string command = @"UPDATE public.enderecos SET logradouro = @logradouro, numero = @numero, complemento = @complemento, municipio = @municipio, cep = @cep WHERE id = @id;";
            return await service.ScalarAsync<bool>(command, parameters: new
            {
                @logradouro = entity.Logradouro,
                @numero = entity.Numero,
                @complemento = entity.Complemento,
                @municipio = entity.Municipio,
                @cep = entity.Cep,
                @id = entity.Id
            });
        }
    }
}
