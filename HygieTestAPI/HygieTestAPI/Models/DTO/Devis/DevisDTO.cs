using HygieTestAPI.Models.Entities;

namespace HygieTestAPI.Models.DTO.Devis
{
    public class DevisDTO
    {
        public required LigneDevis[] LignesDevis { get; set; }

        public required Guid GrossisteId { get; set; }
    }

    public class LigneDevis
    {

        public required Guid BiereId { get; set; }
        public int Quantite { get; set; }
    }
}
