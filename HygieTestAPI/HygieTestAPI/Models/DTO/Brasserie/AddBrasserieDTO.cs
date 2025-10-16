namespace HygieTestAPI.Models.DTO.Brasserie
{
    public class AddBrasserieDTO
    {
        public required string Name { get; set; }
        public required IFormFile LogoFile { get; set; }
    }
}
