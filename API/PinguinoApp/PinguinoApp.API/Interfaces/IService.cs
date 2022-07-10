using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Interfaces
{
    public interface IService<T>
    {
        public Task<IEnumerable<T>> Get();

        public Task<T> Get(int id);

        public Task<bool> Insert(T entity);

        public Task<bool> Insert(IEnumerable<T> entities);

        public Task<bool> Update(T entity);

        public Task<bool> Delete(int id);
    }
}
