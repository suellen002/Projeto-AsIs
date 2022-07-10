namespace PinguinoApp.API.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Endereco { get; set; }
        public string Cnpjcpf { get; set; }
        public string Email { get; set; }
    }
}
