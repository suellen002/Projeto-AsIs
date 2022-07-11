namespace PinguinoApp.API.Models
{
    public class Estado
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public string Sigla { get; set; }

        public Pais Pais { get; set; }

        public bool Ativo { get; set; }
    }
}
