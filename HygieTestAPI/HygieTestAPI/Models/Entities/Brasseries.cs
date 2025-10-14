namespace HygieTestAPI.Models.Entities
{
    public class Brasseries
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Logo { get; set; }
        //public required? string Logo { get; set; }
    }
}
