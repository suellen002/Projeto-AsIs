using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class EnderecosService : IService<Endereco>
    {
        IRepository<Endereco> repository;

        public EnderecosService(EnderecosRepository repository)
        {
            this.repository = repository;
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<IEnumerable<Endereco>> Get()
        {
            return await repository.Get();
        }

        public async Task<Endereco> Get(int id)
        {
            return await repository.Get(id);
        }

        public async Task<bool> Insert(Endereco entity)
        {
            return await repository.Insert(entity);
        }

        public async Task<bool> Insert(IEnumerable<Endereco> entities)
        {
            return await repository.Insert(entities);
        }

        public async Task<bool> Update(Endereco entity)
        {
            return await repository.Update(entity);
        }
    }
}
