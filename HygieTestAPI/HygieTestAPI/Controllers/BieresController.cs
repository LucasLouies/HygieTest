using HygieTestAPI.Data;
using HygieTestAPI.Models;
using HygieTestAPI.Models.DTO;
using HygieTestAPI.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HygieTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BieresController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public BieresController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult GetAllBieres() 
        {
            var allBieres = dbContext.bieres.ToList();

            return Ok(allBieres);
        }

        [HttpPost]
        public async Task<ActionResult> PostBiere([FromForm] AddBiereDTO addBiereDTO)
        {
            if (addBiereDTO.LogoFile == null || addBiereDTO.LogoFile.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadsFolder = Path.Combine("wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(addBiereDTO.LogoFile.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await addBiereDTO.LogoFile.CopyToAsync(stream);
            }

            var biereEntity = new Bieres
            {
                Name = addBiereDTO.Name,
                Degre = addBiereDTO.Degre,
                Prix = addBiereDTO.Prix,
                Logo = $"/images/{fileName}"
            };

            dbContext.Add(biereEntity);
            await dbContext.SaveChangesAsync();

            return Ok(biereEntity);
        }


    }
}
