using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class FornecedoresRepository : IRepository<Fornecedor>
    {
        IDapperService service;

        public FornecedoresRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.fornecedores SET ativo = '0' WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @id = id });
            return true;
        }

        public async Task<IEnumerable<Fornecedor>> Get()
        {
            string command = @"SELECT id, nome, cnpjcpf, email, endereco, ativo FROM public.fornecedores WHERE ativo = true;";
            return await service.ListAsync<Fornecedor>(command);
        }

        public async Task<Fornecedor> Get(int id)
        {
            string command = @"SELECT id, nome, cnpjcpf, email, endereco, ativo FROM public.fornecedores WHERE id = @id;";
            return await service.SingleAsync<Fornecedor>(command, parameters: new { @id = id });
        }

        public async Task<bool> Insert(Fornecedor entity)
        {
            string command = @"INSERT INTO fornecedores ( nome, cnpjcpf, email, endereco ) VALUES ( @nome, @cnpjcpf, @email, @endereco );";
            await service.ScalarAsync<bool>(command, parameters: new { @nome = entity.Nome, @cnpjcpf = entity.CnpjCpf, @email = entity.Email, @endereco = entity.Endereco });
            return true;
        }

        public async Task<bool> Insert(IEnumerable<Fornecedor> entities)
        {
            string command = @"INSERT INTO fornecedores ( nome, cnpjcpf, email, endereco ) VALUES ( @nome, @cnpjcpf, @email, @endereco );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new { @nome = entity.Nome, @cnpjcpf = entity.CnpjCpf, @email = entity.Email, @endereco = entity.Endereco });
            }

            return true;
        }

        public async Task<bool> Update(Fornecedor entity)
        {
            string command = @"UPDATE public.fornecedores SET nome = @nome, cnpjcpf = @cnpjcpf, email = @email, endereco = @endereco WHERE id = @id;";
            await service.ScalarAsync<bool>(
                command,
                parameters: new
                {
                    @nome = entity.Nome,
                    @cnpjcpf = entity.CnpjCpf,
                    @email = entity.Email,
                    @endereco = entity.Endereco,
                    @id = entity.Id
                }
           );

            return true;
        }
    }
}
