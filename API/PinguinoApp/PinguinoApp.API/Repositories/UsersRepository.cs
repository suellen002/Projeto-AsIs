using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace PinguinoApp.API.Repositories
{
    public static class UsersRepository
    {
        public static User GetUser(string name)
        {
            var users = GetUsersMock();

            return users.Where(u => u.Name == name).FirstOrDefault();
        }

        private static List<User> GetUsersMock()
        {
            List<User> users = new();

            users.Add(new User() { Id = 1, Name = "Admin", Password = "admin", Role = "Administrador" });
            users.Add(new User() { Id = 2, Name = "Vendedor", Password = "vendedor", Role = "Vendedor" });
            users.Add(new User() { Id = 3, Name = "Cliente", Password = "cliente", Role = "Cliente" });
            users.Add(new User() { Id = 4, Name = "Gerente", Password = "gerente", Role = "Gerente" });

            return users;
        }
    }
}
