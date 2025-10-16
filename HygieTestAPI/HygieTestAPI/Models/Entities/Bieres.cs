using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HygieTestAPI.Models.Entities
{
    public class Bieres
    {
        [Key]
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required int Degre { get; set; }
        public required float Prix { get; set; }
        public required string Logo{ get; set; }
        [ForeignKey("Brasseries")]
        public required Guid BrasseriesId { get; set; }
    }
}
