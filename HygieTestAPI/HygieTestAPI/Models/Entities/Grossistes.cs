using System.ComponentModel.DataAnnotations;

namespace HygieTestAPI.Models.Entities
{
    public class Grossistes
    {
        [Key]
        public Guid Id { get; set; }
        public required string Name { get; set; }
    }
}
