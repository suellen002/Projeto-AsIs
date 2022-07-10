using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class PaisesService : IService<Pais>
    {
        IRepository<Pais> repository;

        public PaisesService(PaisesRepository repository)
        {
            this.repository = repository;
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<IEnumerable<Pais>> Get()
        {
            return await repository.Get();
        }

        public async Task<Pais> Get(int id)
        {
            return await repository.Get(id);
        }

        public async Task<bool> Insert(Pais entity)
        {
            return await repository.Insert(entity);
        }

        public async Task<bool> Insert(IEnumerable<Pais> entities)
        {
            return await repository.Insert(entities);
        }

        public async Task<bool> Update(Pais entity)
        {
            return await repository.Update(entity);
        }
    }
}
