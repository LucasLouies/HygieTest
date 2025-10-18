using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HygieTestAPI.Models.Entities
{
    [PrimaryKey(nameof(BieresId), nameof(GrossistesId))]
    public class Stocks
    {
        [ForeignKey("Bieres")]
        public required Guid BieresId { get; set; }
        [ForeignKey("Grossistes")]
        public required Guid GrossistesId { get; set; }
        public required int Quantite { get; set; }
    }
}