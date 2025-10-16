using Microsoft.AspNetCore.Http;

namespace HygieTestAPI.Models.DTO.Biere
{
    public class AddBiereDTO
    {
        public required string Name { get; set; }
        public required int Degre { get; set; }
        public required float Prix { get; set; }
        public required IFormFile LogoFile { get; set; }
        public required Guid BrasserieId { get; set; }
    }
}