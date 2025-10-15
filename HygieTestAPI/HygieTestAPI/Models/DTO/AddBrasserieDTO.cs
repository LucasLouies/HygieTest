namespace HygieTestAPI.Models.DTO
{
    public class AddBrasserieDTO
    {
        public required string Name { get; set; }
        public required IFormFile LogoFile { get; set; }
    }
}
