using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class FornecedoresService : IService<Fornecedor>
    {
        IRepository<Fornecedor> repository;

        public FornecedoresService(FornecedoresRepository repository)
        {
            this.repository = repository;
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<IEnumerable<Fornecedor>> Get()
        {
            return await repository.Get();
        }

        public async Task<Fornecedor> Get(int id)
        {
            return await repository.Get(id);
        }

        public async Task<bool> Insert(Fornecedor entity)
        {
            return await repository.Insert(entity);
        }

        public async Task<bool> Insert(IEnumerable<Fornecedor> entities)
        {
            return await repository.Insert(entities);
        }

        public async Task<bool> Update(Fornecedor entity)
        {
            return await repository.Update(entity);
        }
    }
}
