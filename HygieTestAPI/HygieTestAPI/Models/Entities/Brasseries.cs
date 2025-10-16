using System.ComponentModel.DataAnnotations;

namespace HygieTestAPI.Models.Entities
{
    public class Brasseries
    {
        [Key]
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Logo { get; set; }
    }
}
