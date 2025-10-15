using HygieTestAPI.Data;
using HygieTestAPI.Models.DTO;
using HygieTestAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HygieTestAPI.Controllers
{
    //localhost:xxxx/api/brasseries
    [Route("api/[controller]")]
    [ApiController]
    public class BrasseriesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public BrasseriesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult GetAllBrasseries() 
        {
            var AllBrasseries = dbContext.brasseries.ToList();

            return Ok(AllBrasseries);
        }

        [HttpPost]
        public async Task<ActionResult> PostBrasserie([FromForm]AddBrasserieDTO addBrasserieDTO)
        {
            if (addBrasserieDTO.LogoFile == null || addBrasserieDTO.LogoFile.Length == 0) 
            {
                return BadRequest("No file Uploaded");
            }

            var uploadsFolder = Path.Combine("wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(addBrasserieDTO.LogoFile.FileName)}";
            var filePath = Path.Combine(uploadsFolder + "/Brasseries/", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await addBrasserieDTO.LogoFile.CopyToAsync(stream);
            }

            var brasserieEntity = new Brasseries()
            {
                Name = addBrasserieDTO.Name,
                Logo = $"/images/Brasseries/{fileName}",
            };

            dbContext.brasseries.Add(brasserieEntity);

            dbContext.SaveChanges();

            return Ok(brasserieEntity);
        }
    }
}