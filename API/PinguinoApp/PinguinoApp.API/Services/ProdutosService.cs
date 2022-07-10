using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class ProdutosService : IService<Produto>
    {
        IRepository<Produto> repository;

        public ProdutosService(ProdutosRepository repository)
        {
            this.repository = repository;
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<IEnumerable<Produto>> Get()
        {
            return await repository.Get();
        }

        public async Task<Produto> Get(int id)
        {
            return await repository.Get(id);
        }

        public async Task<bool> Insert(Produto entity)
        {
            return await repository.Insert(entity);
        }

        public async Task<bool> Insert(IEnumerable<Produto> entities)
        {
            return await repository.Insert(entities);
        }

        public async Task<bool> Update(Produto entity)
        {
            return await repository.Update(entity);
        }
    }
}
