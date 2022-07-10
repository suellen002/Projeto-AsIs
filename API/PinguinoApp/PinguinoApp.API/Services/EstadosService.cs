using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class EstadosService : IService<Estado>
    {
        IRepository<Estado> repository;

        public EstadosService(EstadosRepository repository)
        {
            this.repository = repository;
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<IEnumerable<Estado>> Get()
        {
            return await repository.Get();
        }

        public async Task<Estado> Get(int id)
        {
            return await repository.Get(id);
        }

        public async Task<bool> Insert(Estado entity)
        {
            return await repository.Insert(entity);
        }

        public async Task<bool> Insert(IEnumerable<Estado> entities)
        {
            return await repository.Insert(entities);
        }

        public async Task<bool> Update(Estado entity)
        {
            return await repository.Update(entity);
        }
    }
}
