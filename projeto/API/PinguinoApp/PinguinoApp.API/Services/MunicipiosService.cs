using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class MunicipiosService : IService<Municipio>
    {
        IRepository<Municipio> repository;

        public MunicipiosService(MunicipiosRepository repository)
        {
            this.repository = repository;
        }

        public async Task<bool> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<IEnumerable<Municipio>> Get()
        {
            return await repository.Get();
        }

        public async Task<Municipio> Get(int id)
        {
            return await repository.Get(id);
        }

        public async Task<bool> Insert(Municipio entity)
        {
            return await repository.Insert(entity);
        }

        public async Task<bool> Insert(IEnumerable<Municipio> entities)
        {
            return await repository.Insert(entities);
        }

        public async Task<bool> Update(Municipio entity)
        {
            return await repository.Update(entity);
        }
    }
}
