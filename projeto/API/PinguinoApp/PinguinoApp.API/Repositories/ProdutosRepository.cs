using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class ProdutosRepository : IRepository<Produto>
    {
        IDapperService service;
        string tabela = "public.produtos";

        public ProdutosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = $"UPDATE {tabela} SET ativo = '0' WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @id = id });
            return true;
        }

        public async Task<IEnumerable<Produto>> Get()
        {
            IEnumerable<Produto> produtos = new List<Produto>();
            string command = $@"SELECT p.id, p.nome, p.sku, p.codigobarras, p.descricao, p.precovenda, p.ativo,
                                    f.id, f.nome, f.cnpjcpf, f.email, f.endereco, f.ativo
                                FROM {tabela} p
                                INNER JOIN public.fornecedores f 
                                    on p.fornecedor = f.id and f.ativo = true
                                WHERE p.ativo = true;";

            using (var reader = await service.MultiAsync(command))
            {
                produtos = reader.Read<Produto, Fornecedor, Produto>((produto, fornecedor) => { produto.Fornecedor = fornecedor; return produto; });
            }

            return produtos;
        }

       

        public async Task<Produto> Get(int id)
        {
            IEnumerable<Produto> produtos = new List<Produto>();
            string command = $@"SELECT p.id, p.nome, p.sku, p.codigobarras, p.descricao, p.precovenda, p.ativo,
                                    f.id, f.nome, f.cnpjcpf, f.email, f.endereco, f.ativo
                                FROM {tabela} p
                                INNER JOIN public.fornecedores f 
                                    on p.fornecedor = f.id and f.ativo = true
                                WHERE p.ativo = true and p.id = @id;";

            using (var reader = await service.MultiAsync(command, args: new { @id = id }))
            {
                produtos = produtos = reader.Read<Produto, Fornecedor, Produto>((produto, fornecedor) => { produto.Fornecedor = fornecedor; return produto; });
            }

            return produtos.FirstOrDefault();
        }        

        public async Task<bool> Insert(Produto entity)
        {
            string command = $"INSERT INTO {tabela} ( nome, sku, codigobarras, fornecedor, descricao, precovenda, ativo ) VALUES ( @nome, @sku, @codigobarras, @fornecedor, @descricao, @precovenda, @ativo );";
            await service.ScalarAsync<bool>(
                command,
                parameters: new
                {
                    @nome = entity.Nome,
                    @sku = entity.Sku,
                    @codigobarras = entity.Codigobarras,
                    @fornecedor = entity.Fornecedor.Id,
                    @descricao = entity.Descricao,
                    @precovenda = entity.Precovenda,
                    @ativo = entity.Ativo
                }
            );

            return true;
        }

        public async Task<bool> Insert(IEnumerable<Produto> entities)
        {
            string command = $"INSERT INTO {tabela} ( nome, sku, codigobarras, fornecedor, descricao, precovenda, ativo ) VALUES ( @nome, @sku, @codigobarras, @fornecedor, @descricao, @precovenda, @ativo );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters:
                                                new
                                                {
                                                    @nome = entity.Nome,
                                                    @sku = entity.Sku,
                                                    @codigobarras = entity.Codigobarras,
                                                    @fornecedor = entity.Fornecedor.Id,
                                                    @descricao = entity.Descricao,
                                                    @precovenda = entity.Precovenda,
                                                    @ativo = entity.Ativo
                                                });
            }
            return true;
        }

        public async Task<bool> Update(Produto entity)
        {
            string command = $"UPDATE {tabela} SET nome=@nome, sku=@sku, codigobarras=@codigobarras, fornecedor=@fornecedor, descricao=@descricao, precovenda=@precovenda WHERE id = @id;";
            await service.ScalarAsync<bool>(
                command,
                parameters: new
                {
                    @nome = entity.Nome,
                    @sku = entity.Sku,
                    @codigobarras = entity.Codigobarras,
                    @fornecedor = entity.Fornecedor.Id,
                    @descricao = entity.Descricao,
                    @precovenda = entity.Precovenda,
                }
            );

            return true;
        }
    }
}
