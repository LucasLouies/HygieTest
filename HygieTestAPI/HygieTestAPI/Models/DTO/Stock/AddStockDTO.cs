namespace HygieTestAPI.Models.DTO.Stock
{
    public class AddStockDTO
    {
        public required Guid BiereId { get; set; }
        public required Guid GrossisteId { get; set; }
        public required int Quantite { get; set; }
    }
}
