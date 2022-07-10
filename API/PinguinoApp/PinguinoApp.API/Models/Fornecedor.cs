namespace PinguinoApp.API.Models
{
    public class Fornecedor
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string CnpjCpf { get; set; }

        public string Email { get; set; }

        public int Endereco { get; set; }

        public bool Ativo { get; set; }
    }
}
