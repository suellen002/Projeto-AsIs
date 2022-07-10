using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Interfaces
{
    public interface IDapperService
    {
        Task<SqlMapper.GridReader> MultiAsync(string procedure, object args = null);

        Task<T> SingleAsync<T>(string procedure, object parameters = null);

        Task<T> ScalarAsync<T>(string procedure, object parameters = null);

        Task RunAsync(string procedure, object parameters = null);

        Task<IEnumerable<T>> ListAsync<T>(string procedure, object parameters = null);
    }
}
