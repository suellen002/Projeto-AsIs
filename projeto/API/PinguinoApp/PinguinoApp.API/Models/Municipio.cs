namespace PinguinoApp.API.Models
{
    public class Municipio
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public Estado Estado { get; set; }

        public bool Ativo { get; set; }
    }
}
