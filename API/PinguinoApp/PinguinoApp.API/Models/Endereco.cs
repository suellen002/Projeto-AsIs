namespace PinguinoApp.API.Models
{
    public class Endereco
    {
        public int Id { get; set; }

        public string Logradouro { get; set; }

        public string Numero { get; set; }

        public string Complemento { get; set; }

        public Municipio Municipio { get; set; }

        public string Cep { get; set; }

        public bool Ativo { get; set; }
    }
}
