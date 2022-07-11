using PinguinoApp.API.Interfaces;

namespace PinguinoApp.API.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
    }
}
